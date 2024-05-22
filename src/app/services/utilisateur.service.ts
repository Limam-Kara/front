import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Utilisateur } from '../models/Utilisateur';
import { Role } from '../models/Role';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private baseURL = "http://localhost:8085/SGI/utilisateurs";
  constructor(private http: HttpClient) { }

  saveUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.baseURL}`+"/save", utilisateur)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUtilisateurByUsername(username: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseURL}`+"/"+`${username}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUtilisateurById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseURL}`+"/byId/"+`${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getAuthenticatedUser(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseURL}`+"/authenticated")
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseURL}`+"/all")
      .pipe(
        catchError(this.handleError)
      );
  }
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseURL}`+"/allRoles")
      .pipe(
        catchError(this.handleError)
      );
  }

  editUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.baseURL}`+"/edit", utilisateur)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}`+"/"+`${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
