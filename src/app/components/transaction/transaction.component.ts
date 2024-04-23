import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactions = [];
  constructor(
    private dataService: DataService,
    private toastr: ToastrService
  ) { }
  ngOnInit() {
    this.getTransactions()
  }
  getTransactions() {
    this.dataService.getTransactions().subscribe((res: any) => {
      if (res.success) {
        this.transactions = res.data
      } else {
        this.toastr.error(res.message, 'Error')
      }
    }, (error) => {
      this.toastr.error(error.error.message, 'Error')
    })
  }
  // transactions = [
  //   { amount: 100, type: 'deposit', createdAt: new Date('2024-04-03T10:15:00') },
  //   { amount: 50, type: 'withdrawal', createdAt: new Date('2024-04-02T15:30:00') },
  //   { amount: 200, type: 'deposit', createdAt: new Date('2024-04-01T08:45:00') },
  // ];
}
