import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { DataService } from 'src/app/services/data.service';
import { SocketIoService } from 'src/app/services/socket-io.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  activePeriod: any;
  allPeriods: any = []
  loginData$: Observable<any>;
  periodTimer = 30;
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private toastr: ToastrService,
    private authService: AuthService,
    private socket: Socket,
    private socketService: SocketIoService
  ) { }

  ngOnInit(): void {
    this.loginData$ = this.authService.getLoginData();
    this.getActivePeriod()
    this.socket.fromEvent('periodTimer').subscribe((timer: any) => {
      this.periodTimer = timer
    }, (error) => {
      this.toastr.error(error.error.message, 'Error')
    })
    this.socket.fromEvent('periodResult').subscribe((result: any) => {
      if (result.winners.includes(JSON.parse(localStorage.getItem('user'))._id)) {
        this.toastr.success('You won the bid', 'Congratulations')
      } else if (result.losers.includes(JSON.parse(localStorage.getItem('user'))._id)) {
        this.toastr.error('You lost the bid', 'Better luck next time')
      }
      this.getActivePeriod()
      this.getUserDetails()     
    }, (error) => {
      this.toastr.error(error.error.message, 'Error')
    })
  }
  transformTimer(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
  openDialog(color: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        color: color,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createBid(result);
        // this.snackBar.open("Bid placed successfully", "ok", {
        //   duration: 1000,
        // });
      }
    });
  }
  getActivePeriod() {
    this.dataService.getActivePeriod().subscribe((res: any) => {
      if (res.success) {
        this.activePeriod = res.data
      } else {
        this.toastr.error(res.message, 'Error')
      }
    }, (error) => {
      this.toastr.error(error.error.message, 'Error')
    })
  }
  getUserDetails() {
    this.dataService.getUser().subscribe((res: any) => {
      if (res.success) {
        this.authService.setLoginData(res.data)
      } else {
        this.toastr.error(res.message, 'Error')
      }
    }, (error) => {
      this.toastr.error(error.error.message, 'Error')
    })
  }
  createBid(result: any) {
    const payload = result;
    this.dataService.createBid(payload).subscribe((res: any) => {
      if (res.success) {
        let user = JSON.parse(localStorage.getItem('user'))
        user.walletBalance -= res.data.amount
        this.authService.setLoginData(user)
        this.toastr.success(res.message, 'Success')
      } else {
        this.toastr.error(res.message, 'Error')
      }
    }, (error) => {
      this.toastr.error(error.error.message, 'Error')
    })
  }
}
