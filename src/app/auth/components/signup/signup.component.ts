import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.signupForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      this._authService.signup(this.signupForm.value).subscribe(res => {
        if (res.success) {
          this._authService.setLoginData(res.data);
          this._toastr.success(res.message, 'Success!');
          this._router.navigate(['/auth/login']);
        } else {
          this._toastr.error(res.message, 'Error!');
        }
      })
    }
  }
  onGoogleAuth() {
    this._toastr.info('Signing up with Google', 'Info!');
  }
}
