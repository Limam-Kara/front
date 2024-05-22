import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annexe } from '../models/annexe';

@Injectable({
  providedIn: 'root'
})
export class AnnexeService {
  private baseURL = "http://localhost:8085/SGI/Annexe/Annexes";

  constructor(private httpclient:HttpClient) { }

  getAllAnnexe(): Observable<Annexe[]>{
    return this.httpclient.get<Annexe[]>(`${this.baseURL}`);
  }
  createAnnexe(annexe:Annexe): Observable<object>{
    return this.httpclient.post(`${this.baseURL}`,annexe);
  }
  getAnnexeById(id: number): Observable<Annexe>{
    return this.httpclient.get<Annexe>(`${this.baseURL}/${id}`);
  }
  updateAnnexe(id: number, annexe: Annexe): Observable<Object>{
    return this.httpclient.put(`${this.baseURL}/${id}`, annexe);
  }
  deleteAnnexe(id: number): Observable<object>{
    return this.httpclient.delete(`${this.baseURL}/${id}`);
  }
}
