import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetService } from 'src/app/services/reset.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent {
  password: string = '';
  passwordConfirmer: string = '';
  token!: string;


  constructor(
    private resetPasswordService: ResetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve token from route parameters
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    if (!this.password || !this.passwordConfirmer) {
      alert('Veuillez saisir un mot de passe et le confirmer.');
      return;
    }

    if (this.password !== this.passwordConfirmer) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    this.resetPasswordService.resetPassword(this.token, this.password).subscribe(
      (response: any) => {
        console.log(response);
        alert('Mot de passe réinitialisé avec succès !');
        // Redirect or handle success according to your application's logic
      },
      (error: any) => {
        console.error('Reset Password error:', error);
        alert('Erreur lors de la réinitialisation du mot de passe.');
        // Handle error response according to your application's logic
      }
    );
  }

}
