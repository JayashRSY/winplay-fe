import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
  constructor(
    private http: SharedService,
    private _router: Router,
    
  ) { }

  setLoginData(user: Observable<any>): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.loginDataSubject.next(user);
    
  }

  getLoginData(): Observable<any> {
    return this.loginDataSubject.asObservable();
  }

  signup(payload: any): Observable<any> {
    return this.http.post('/auth/signup', payload);
  }
  login(payload: any): Observable<any> {
    return this.http.post('/auth/signin', payload);
  }
  continueWithGoogle(payload: any): Observable<any> {
    return this.http.post('/auth/google', payload);
  }
  signout(): Observable<any> {
    return this.http.post('/auth/signout', null);
  }
  logout() {
    localStorage.removeItem('user');
    this.loginDataSubject.next(null);
    this._router.navigate(['/']);
    window.location.reload();
  }
}
