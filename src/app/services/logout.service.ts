import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private baseURL = "http://localhost:8085/";
  constructor(private http: HttpClient) { }
  logout(): Observable<any> {
    return this.http.get(this.baseURL+ 'logout');
  }

}
