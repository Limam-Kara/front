import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ForgetService {
  private baseURL = "http://localhost:8085/";
  constructor(private http: HttpClient) { }
  forgetPassword(email: string): Observable<any> {
    return this.http.post(this.baseURL + 'forgetPassword', email, { responseType: 'text' });
  }
}
