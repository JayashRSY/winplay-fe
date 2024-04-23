import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  requests = []
  constructor(
    private dataService: DataService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllRequests()
  }
  getAllRequests() {
    this.dataService.getAllRequests().subscribe((res: any) => {
      if (res.success) {
        this.requests = res.data
      } else {
        this.toastr.error(res.message, 'Error')
      }
    }, (error) => {
      this.toastr.error(error.error.message, 'Error')
    })
  }
  acceptRequest(request: any) {
    const payload = {
      requestId: request._id
    }
    this.dataService.acceptRequest(payload).subscribe((res: any) => {
      if (res.success) {
        this.toastr.success(res.message, 'Success')
        this.getAllRequests()
      } else {
        this.toastr.error(res.message, 'Error')
      }
    }, (error) => {
      this.toastr.error(error.error.message, 'Error')
    })
  }
  rejectRequest(request: any) {
    const payload = {
      requestId: request._id
    }
    this.dataService.rejectRequest(payload).subscribe((res: any) => {
      if (res.success) {
        this.toastr.success(res.message, 'Success')
      } else {
        this.toastr.error(res.message, 'Error')
      }
    }, (error) => {
      this.toastr.error(error.error.message, 'Error')
    })
  }

}
