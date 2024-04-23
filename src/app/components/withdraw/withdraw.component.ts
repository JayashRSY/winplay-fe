import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WithdrawComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private _router: Router
  ) {
    this.form = this.fb.group({
      upiId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
    });
  }
  ngOnInit(): void {
  }
  onSubmit() {
    if (this.form.valid) {
      const payload = {
        upiId: this.form.value.upiId,
        amount: parseFloat(this.form.value.amount)
      }
      console.log("🚀 ~ file: withdraw.component.ts:32 ~ payload:", payload);
      this.dataService.createWithdrawRequest(payload).subscribe((res: any) => {
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


