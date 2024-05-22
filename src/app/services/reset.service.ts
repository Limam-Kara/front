import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetService {
  private baseURL = "http://localhost:8085/";

  constructor(private http: HttpClient) { }

  resetPassword(token: string, newPassword: string): Observable<any> {
    // Define the request body containing token and newPassword
    const requestBody = { token, newPassword };

    // Make the POST request with the request body
    return this.http.post(this.baseURL + 'resetPassword', requestBody,{ responseType: 'text' });
  }
}
