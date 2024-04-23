import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RechargeComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private _router: Router
  ) {
    this.form = this.fb.group({
      paymentId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
    });
  }
  ngOnInit(): void {
  }
  onSubmit() {
    if (this.form.valid) {
      const payload = {
        paymentId: this.form.value.paymentId,
        amount: parseFloat(this.form.value.amount)
      }
      this.dataService.createDepositRequest(payload).subscribe((res: any) => {
        if (res.success) {
          this.toastr.success(res.message, 'Success')
        } else {
          this.toastr.error(res.message, 'Error')
        }
      }, (error) => {
        this.toastr.error(error.error.message, 'Error')
      })
      this.form.reset()
      this._router.navigate(['/wallet']);
    } else {
      this.toastr.error("Invalid form", 'Error')
    }
  }
}


