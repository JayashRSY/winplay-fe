import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.scss']
})
export class SocialAuthComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _socialAuthService: SocialAuthService,
    private _toastr: ToastrService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._socialAuthService.authState.subscribe((user) => {
      if (user.idToken) {
        this._authService.continueWithGoogle({ idToken: user.idToken }).subscribe(res => {
          if (res.success) {
            this._authService.setLoginData(res.data);
            this._toastr.success(res.message, 'Success!');
            this._router.navigate(['/play']);
          } else {
            this._toastr.error(res.message, 'Error!');
          }
        })
      } else {
        this._toastr.info('No user logged in', 'Info!');
      }
    });
  }

}
