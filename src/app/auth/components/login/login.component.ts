import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  onLogin() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe(res => {
        if (res.success) {
          this._authService.setLoginData(res.data);
          this._toastr.success(res.message, 'Success!');
          this._router.navigate(['/play']);
        } else {
          this._toastr.error(res.message, 'Error!');
        }
      })
    }
  }
}
