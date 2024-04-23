import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Tabs } from 'src/app/constants/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.5s ease', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  navTabs;
  loginData$: Observable<any>;
  isMobile = true;
  isCollapsed = true;

  constructor(
    private _authService: AuthService,
    private _dataService: DataService,
    private _toastr: ToastrService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private observer: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.navTabs = Tabs
    this.loginData$ = this._authService.getLoginData();
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
  isLoggedIn() {
    return true
  }
  isAdmin(loginData: any): boolean {
    return loginData && loginData.role === 'admin';
  }
  onLogout() {
    this._authService.logout();
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
}
