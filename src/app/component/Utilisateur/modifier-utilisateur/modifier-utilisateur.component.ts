import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { District } from 'src/app/models/district';
import { Role } from 'src/app/models/Role';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { DistrictService } from 'src/app/services/district.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-modifier-utilisateur',
  templateUrl: './modifier-utilisateur.component.html',
  styleUrls: ['./modifier-utilisateur.component.scss']
})
export class ModifierUtilisateurComponent implements OnInit {
  id!: number;
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
  roles: Role[] = [];
  districts: District[] = [];
  constructor(
    private districtservice: DistrictService,
    private route: ActivatedRoute,
    private utilisateurService: UtilisateurService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUtilisateurById();
    this.getAllRoles();
    this.getAllDistrict();
  }
  private getAllDistrict() {
    this.districtservice.getAllDistrict().subscribe(data => {
      this.districts = data;

    });
  }
  private getUtilisateurById() {
    this.utilisateurService.getUtilisateurById(this.id).subscribe(
      data => {
        console.log(data);
        this.utilisateur = data;
      },
      error => {
        console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
        this.toastr.error('Erreur lors de la récupération de l\'utilisateur', 'Erreur');
      }
    );
  }

  private getAllRoles() {
    this.utilisateurService.getAllRoles().subscribe(
      data => {
        console.log(data);
        this.roles = data;
      },
      error => {
        console.error('Erreur lors de la récupération des rôles : ', error);
        this.toastr.error('Erreur lors de la récupération des rôles', 'Erreur');
      }
    );
  }

  goToUtilisateurPage(): void {
    this.router.navigate(['/component/utilisateur']);
  }

  onSubmit(): void {
    if (!this.validateFields()) {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires', 'Avertissement');
      return;
    }

    const utilisateurUpdate: Utilisateur = {
      id: this.utilisateur.id,
      ppr: this.utilisateur.ppr,
      nom: this.utilisateur.nom,
      prenom: this.utilisateur.prenom,
      fonction: this.utilisateur.fonction,
      username: this.utilisateur.username,
      email: this.utilisateur.email,
      tel: this.utilisateur.tel,
      genre: this.utilisateur.genre,
      adresse: this.utilisateur.adresse,
      dateDeNaissance: this.utilisateur.dateDeNaissance,
      idRole: this.utilisateur.idRole,
      district: this.utilisateur.district
    };
  // Create a new object with the desired structure
  const newUtilisateur = {
    id: utilisateurUpdate.id,
    ppr: utilisateurUpdate.ppr,
    nom: utilisateurUpdate.nom,
    prenom: utilisateurUpdate.prenom,
    fonction: utilisateurUpdate.fonction,
    username: utilisateurUpdate.username,
    email: utilisateurUpdate.email,
    tel: utilisateurUpdate.tel,
    genre: utilisateurUpdate.genre,
    adresse: utilisateurUpdate.adresse,
    dateDeNaissance: utilisateurUpdate.dateDeNaissance,
    idRole: {
      id: utilisateurUpdate.idRole.id,
      nom: utilisateurUpdate.idRole.nom,
      description: utilisateurUpdate.idRole.description
    },
    district: {
      id: utilisateurUpdate.district.id,
      nom: utilisateurUpdate.district.nom
    }
  };

  console.log(newUtilisateur);
    // console.log(utilisateurUpdate);

    // Save the Utilisateur
    this.utilisateurService.editUtilisateur(newUtilisateur).subscribe(
      (response) => {
        console.log('Utilisateur modifié avec succès:', response);
        this.toastr.success('Utilisateur modifié avec succès!', 'Succès');
        this.goToUtilisateurPage();
      },
      (error) => {
        console.error('Erreur lors de la modification de l\'utilisateur : ', error);
        this.toastr.error('Erreur lors de la modification de l\'utilisateur', 'Erreur');
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
