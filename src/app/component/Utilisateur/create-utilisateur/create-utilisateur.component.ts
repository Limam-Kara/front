import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { District } from 'src/app/models/district';
import { Role } from 'src/app/models/Role';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { DistrictService } from 'src/app/services/district.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-create-utilisateur',
  templateUrl: './create-utilisateur.component.html',
  styleUrls: ['./create-utilisateur.component.scss']
})
export class CreateUtilisateurComponent implements OnInit {
  utilisateur: Utilisateur = {
    idRole: {
      id: 2,
      nom: '',
      description: ''
    },
    district: {
      id: 1,
      nom: '',

    }
  };

  districts: District[] = [];
  constructor(
    private districtservice: DistrictService,
    private utilisateurService: UtilisateurService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllDistrict();
  }
  private getAllDistrict() {
    this.districtservice.getAllDistrict().subscribe(data => {
      this.districts = data;

    });
  }


  goToUtilisateurPage(): void {
    this.router.navigate(['/component/utilisateur']);
  }

  onSubmit(): void {
    if (!this.validateFields()) {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires', 'Avertissement');
      return;
    }

    console.log(this.utilisateur);

    // Save the Utilisateur
    this.utilisateurService.saveUtilisateur(this.utilisateur).subscribe(
      (response) => {
        console.log('Utilisateur ajouté avec succès:', response);
        this.toastr.success('Utilisateur ajouté avec succès!', 'Succès');
        this.goToUtilisateurPage();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur : ', error);
        this.toastr.error('Erreur lors de l\'ajout de l\'utilisateur', 'Erreur');
      }
    );
  }

  private validateFields(): boolean {
    return (
      this.utilisateur.ppr?.trim() !== '' &&
      this.utilisateur.fonction?.trim() !== '' &&
      this.utilisateur.nom?.trim() !== '' &&
      this.utilisateur.prenom?.trim() !== '' &&
      this.utilisateur.adresse?.trim() !== '' &&

      this.utilisateur.tel?.trim() !== '' &&
      this.utilisateur.email?.trim() !== '' &&
      this.utilisateur.genre?.trim() !== ''
    );
  }
}
