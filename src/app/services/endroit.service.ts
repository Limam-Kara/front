import { Injectable } from '@angular/core';
import { Endroit } from '../models/endroit';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndroitService {

  private baseURL = "http://localhost:8085/SGI/Endroit/Endroits";
  constructor(private httpclient:HttpClient) { }

  getEndroitById(id: number): Observable<Endroit>{
    return this.httpclient.get<Endroit>(`${this.baseURL}/${id}`);
  }
  updateEndroit(id: number, endroit: Endroit): Observable<Object>{
    return this.httpclient.put(`${this.baseURL}/${id}`, endroit);
  }
  deleteEndroit(id: number): Observable<object>{
    return this.httpclient.delete(`${this.baseURL}/${id}`);
  }
  getAllEndroit(): Observable<Endroit[]>{
    return this.httpclient.get<Endroit[]>(`${this.baseURL}`);
  }
  getEndroitsByAuthenticatedUser(): Observable<Endroit[]>{
    return this.httpclient.get<Endroit[]>(`${this.baseURL}/authenticatedUser`);
  }
  createEndroit(endroit:Endroit): Observable<object>{
    return this.httpclient.post(`${this.baseURL}`,endroit);
  }
  createEndroitany(endroit:any): Observable<object>{
    return this.httpclient.post(`${this.baseURL}`,endroit);
  }
}
