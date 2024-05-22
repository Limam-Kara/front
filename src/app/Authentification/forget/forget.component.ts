import { Component } from '@angular/core';
import { ForgetService } from 'src/app/services/forget.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent {
  email: string = ''; // Property to bind to the input field

  constructor(private forgetPasswordService: ForgetService, private toastr: ToastrService) {}

  onSubmit() {
    if (!this.email) {
      this.toastr.warning('Veuillez saisir votre email.', 'Avertissement');
      return;
    }

    this.forgetPasswordService.forgetPassword(this.email).subscribe(
      (response: any) => {
        this.toastr.success('Vérifiez votre e-mail pour réinitialiser votre mot de passe.', 'Succès');
        console.log(response);
      },
      (error: any) => {
        this.toastr.error('Erreur lors de la réinitialisation du mot de passe.', 'Erreur');
        console.error('Forget Password error:', error);
      }
    );
  }
}
