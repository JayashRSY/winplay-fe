import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  loginData$: Observable<any>;
  requests = []

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private dataService: DataService,
    private socket: Socket,
  ) { }
  ngOnInit(): void {
    this.loginData$ = this.authService.getLoginData();
    this.getRequests()
    
    this.socket.fromEvent('updatedUser').subscribe((updatedUser: any) => {
      console.log(JSON.parse(localStorage.getItem('user')), "🚀 ~ file: auth.service.ts:24 ~ updatedUser:", updatedUser);
      if (JSON.parse(localStorage.getItem('user'))._id === updatedUser._id) {
        this.authService.setLoginData(updatedUser);
      }
    }, (error) => {
      this.toastr.error(error.error.message, 'Error')
    })
  }
  getRequests() {
    this.dataService.getRequests().subscribe((res: any) => {
      console.log("🚀 ~ file: wallet.component.ts:35 ~ res:", res);
      if (res.success) {
        this.requests = res.data
      } else {
        this.toastr.error(res.message, 'Error')
      }
    }, (error) => {
      this.toastr.error(error.error.message, 'Error')
    })
  }
}
