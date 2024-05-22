import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseURL = "http://localhost:8085/SGI/Dashboard/";

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}counts`);
  }
}
