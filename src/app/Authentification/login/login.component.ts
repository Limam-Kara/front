import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';

import { LoginService } from 'src/app/services/login.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  hide: boolean = true;

  constructor(
    private toastr: ToastrService,
    private loginService: LoginService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  onSubmit(loginForm: any): void {
    if (!loginForm.valid) {
      return;
    }

    const loginRequest = {
      username: this.username,
      password: this.password,
    };

    this.loginService.login(loginRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Handle invalid credentials error
          this.toastr.error('Nom d\'utilisateur ou mot de passe invalide', 'Erreur de Connexion');
        } else {
          // Handle other errors
          this.toastr.error('Une erreur s\'est produite lors de la connexion', 'Erreur');
        }
        return of(null); // Return a new observable to complete the stream
      })
    ).subscribe((response) => {
      if (response && response.jwt) {
        // Handle successful login
        this.toastr.success('Connexion réussie !', 'Bienvenue', { closeButton: false });
        this.userAuthService.setRole(response.role);
        this.userAuthService.setToken(response.jwt);
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard');
        }, 3300);
      }
    });
  }
}
