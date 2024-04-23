import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  get(path: String, params: String = ''): Observable<any> {
    return this.http.get<any>(environment.apiUrl + path + params);
  }
  post(path: String, payload: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + path, payload);
  }
  delete(path: String, params: String = ''): Observable<any> {
    return this.http.delete(environment.apiUrl + path + params);
  }
  put(path: String, payload: any): Observable<any> {
    return this.http.put<any>(environment.apiUrl + path, payload);
  }
}
