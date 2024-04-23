
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UploadService {
  constructor(private http: HttpClient) { }
  uploadImages(dataFiles: any): Observable<any> {
    return null;
  }
}
