import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseURL = "http://localhost:8085/";
  constructor(private http: HttpClient) { }
  login(loginRequest: any): Observable<any> {
    return this.http.post(this.baseURL+ 'login', loginRequest);
  }
}
