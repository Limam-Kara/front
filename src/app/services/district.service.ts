import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { District } from '../models/district';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  private baseURL = "http://localhost:8085/SGI/District/Districts";

  constructor(private httpclient:HttpClient) { }

  getAllDistrict(): Observable<District[]>{
    return this.httpclient.get<District[]>(`${this.baseURL}`);
  }
  createDistrict(district:District): Observable<object>{
    return this.httpclient.post(`${this.baseURL}`,district);
  }
  getDistrictById(id: number): Observable<District>{
    return this.httpclient.get<District>(`${this.baseURL}/${id}`);
  }
  updateDistrict(id: number, district: District): Observable<Object>{
    return this.httpclient.put(`${this.baseURL}/${id}`, district);
  }
  deleteDistrict(id: number): Observable<object>{
    return this.httpclient.delete(`${this.baseURL}/${id}`);
  }
}
