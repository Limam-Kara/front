import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private baseURL = "http://localhost:8085/SGI/Categorie/Categories";

  constructor(private httpclient:HttpClient) { }

  getAllCategorie(): Observable<Categorie[]>{
    return this.httpclient.get<Categorie[]>(`${this.baseURL}`);
  }
  createCategorie(categorie:Categorie): Observable<object>{
    return this.httpclient.post(`${this.baseURL}`,categorie);
  }
  getCategorieById(id: number): Observable<Categorie>{
    return this.httpclient.get<Categorie>(`${this.baseURL}/${id}`);
  }
  updateCategorie(id: number, categorie: Categorie): Observable<Object>{
    return this.httpclient.put(`${this.baseURL}/${id}`, categorie);
  }
  deleteCategorie(id: number): Observable<object>{
    return this.httpclient.delete(`${this.baseURL}/${id}`);
  }
}
