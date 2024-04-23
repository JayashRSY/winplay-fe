import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any = [];
  constructor(
    private _dataService: DataService,
    private _toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers() {
    this._dataService.getAllUsers().subscribe((res: any) => {
      if (res.success) {
        this.users = res.data
        this._toastr.success(res.message, 'Success!');
      } else {
        this._toastr.error(res.message, 'Error!');
      }
    }, (error) => {
      this._toastr.error(error.error.message, 'Error')
    })
  }
}
