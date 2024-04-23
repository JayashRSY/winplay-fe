import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private wishlistDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: SharedService) { }

  //PERIOD
  getAllPeriods(): Observable<any> {
    return this.http.get('/period/getAllPeriods');
  }
  getActivePeriod(): Observable<any> {
    return this.http.get('/period/getActivePeriod');
  }

  // TRANSACTION
  getTransactions(): Observable<any> {
    return this.http.get('/transaction/getTransactions');
  }
  getAllTransactions(): Observable<any> {
    return this.http.get('/transaction/getAllTransactions');
  }

  // REQUEST
  getRequests(): Observable<any> {
    return this.http.get('/request/getRequests');
  }
  getAllRequests(): Observable<any> {
    return this.http.get('/request/getAllRequests');
  }
  createDepositRequest(payload: any): Observable<any> {
    return this.http.post('/request/createDepositRequest', payload);
  }
  createWithdrawRequest(payload: any): Observable<any> {
    return this.http.post('/request/createWithdrawRequest', payload);
  }
  acceptRequest(payload: any): Observable<any> {
    return this.http.post('/request/acceptRequest', payload);
  }
  rejectRequest(payload: any): Observable<any> {
    return this.http.post('/request/rejectRequest', payload);
  }

  // BID
  createBid(payload: any): Observable<any> {
    return this.http.post('/bid/createBid', payload);
  }

  // USER
  getAllUsers(): Observable<any> {
    return this.http.get('/user/getAllUsers');
  }
  getUser(): Observable<any> {
    return this.http.get('/user/getUser');
  }
  getUserByEmail(email: String): Observable<any> {
    return this.http.get('/user/getUserByEmail/', email);
  }
  deleteUserByEmail(email: String): Observable<any> {
    return this.http.delete('/users/deleteUserByEmail/', email);
  }
  updateUserByEmail(payload: any): Observable<any> {
    return this.http.put('/user/updateUserByEmail', payload);
  }

  setWishlistData(wishlist: Observable<any>): void {
    this.wishlistDataSubject.next(wishlist);
  }
  getWishlistData(): Observable<any> {
    return this.wishlistDataSubject.asObservable();
  }


  // DESIGN
  createDesigns(payload: any): Observable<any> {
    return this.http.post('/designs/createDesigns', payload);
  }
  getAllDesigns(): Observable<any> {
    return this.http.get('/designs/getAllDesigns');
  }

  // ACCOUNT
  addToCart(payload: any): Observable<any> {
    return this.http.put('/account/addToCart', payload);
  }
  getCart(): Observable<any> {
    return this.http.get('/account/getCart');
  }
  removeFromCart(payload: any): Observable<any> {
    return this.http.put('/account/removeFromCart', payload);
  }
  emptyCart(): Observable<any> {
    return this.http.delete('/account/emptyCart');
  }

  // WISHLIST
  addToWishlist(payload: any): Observable<any> {
    return this.http.put('/account/addToWishlist', payload);
  }
  getWishlist(): Observable<any> {
    return this.http.get('/account/getWishlist');
  }
  removeFromWishlist(payload: any): Observable<any> {
    return this.http.put('/account/removeFromWishlist', payload);
  }
  emptyWishlist(): Observable<any> {
    return this.http.delete('/account/emptyWishlist');
  }
}
