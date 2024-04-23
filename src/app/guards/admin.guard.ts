import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { Roles } from "../constants/constants";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getLoginData().pipe(
      map(user => {
        if (user && [Roles.ADMIN].includes(user.role)) {
          return true;
        } else {
          this.toastr.info("Only admins allowed", "Info");
          return this.router.createUrlTree(["/"]);
        }
      })
    );
  }
}
