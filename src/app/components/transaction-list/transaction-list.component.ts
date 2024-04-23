import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions = [];
  constructor(
    private dataService: DataService,
    private toastr: ToastrService
  ) { }
  ngOnInit() {
    this.getAllTransactions()
  }
  getAllTransactions() {
    this.dataService.getAllTransactions().subscribe((res: any) => {
      if (res.success) {
        this.transactions = res.data
      } else {
        this.toastr.error(res.message, 'Error')
      }
    }, (error) => {
      this.toastr.error(error.error.message, 'Error')
    })
  }
}
