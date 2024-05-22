import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/models/categorie';
import { District } from 'src/app/models/district';
import { Endroit } from 'src/app/models/endroit';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { CategorieService } from 'src/app/services/categorie.service';
import { DistrictService } from 'src/app/services/district.service';
import { EndroitService } from 'src/app/services/endroit.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-creat-endroit-u',
  templateUrl: './creat-endroit-u.component.html',
  styleUrls: ['./creat-endroit-u.component.scss']
})
export class CreatEndroitUComponent {
  endroit: Endroit = {
    id: 0,
    nom: '',
    latitude: 0,
    longitude: 0,
    district: { id: 0, nom: '' },
    annexe: { id: 0, nom: '', adresse: '', district: new District },
    categorie: { id: 0, nom: '' },
    utilisateur:{
          idRole: {
      id: 2,
      nom: '',
      description: ''
    },
    district: {
      id: 1,
      nom: '',

    }
    },
  };
  utilisateur: Utilisateur | null = null; // Declare as nullable
  districts: District[] = [];
  districtsL: any[] = [];
  categories: Categorie[] = [];
  selectedDistrictId!: number;
  selectedAnnexId!: number ; // Track selected annex
  selectedAnnexes: any[] = [];

  constructor(
    private utilisateurService: UtilisateurService,
    private endroitService: EndroitService,
    private router: Router,
    private districtService: DistrictService,
    private categorieService: CategorieService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.getAuthenticatedUser();
    this.getAllCategories();
  }
  private getAuthenticatedUser() {
    this.utilisateurService.getAuthenticatedUser().subscribe(data => {
      this.utilisateur = data;
      console.log(this.utilisateur);
      if (this.utilisateur?.district) { // Use optional chaining to avoid errors if utilisateur is null or undefined
        this.selectedDistrictId = this.utilisateur.district.id;
        this.getAllDistricts(); // Load districts first
      }
    });
  }



  getAllDistricts(): void {
    this.districtService.getAllDistrict().subscribe(
      (data: District[]) => {
        this.districts = data;
        this.districtsL = data;
        if (this.utilisateur?.district) { // Check if utilisateur is available
          this.loadAnnexes(this.utilisateur.district.id);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des districts : ', error);
        this.toastr.error('Erreur lors de la récupération des districts', 'Erreur');
      }
    );
  }


  getAllCategories(): void {
    this.categorieService.getAllCategorie().subscribe(
      (data: Categorie[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories : ', error);
        this.toastr.error('Erreur lors de la récupération des catégories', 'Erreur');
      }
    );
  }



  loadAnnexes(districtId: number | null): void {
    if (districtId !== null) {
      const selectedDistrict = this.districtsL.find(d => d.id === districtId);
      this.selectedAnnexes = selectedDistrict ? selectedDistrict.annexes || [] : [];
      if (this.selectedAnnexes.length > 0) {
        this.selectedAnnexId = this.selectedAnnexes[0].id; // Set the selected annex to the first one by default
      }
    } else {
      this.selectedAnnexes = [];
    }
  }


  saveEndroit(): void {
    if (!this.validateFields()) {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires', 'Avertissement');
      return;
    }

    this.endroit.district.id = this.selectedDistrictId ?? 0;
        if (this.utilisateur) {
      const utilisateurUpdate: any = {
        id: this.utilisateur.id,

      };

      this.endroit.utilisateur = utilisateurUpdate;
    } else {
      this.toastr.error('Utilisateur non authentifié', 'Erreur');
      return;
    }
    console.log(this.endroit);
    this.endroitService.createEndroit(this.endroit).subscribe(
      data => {
        console.log(data);
        this.toastr.success('Endroit créé avec succès !', 'Succès');
        this.goToEndroitList();
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          this.toastr.error('Un endroit avec le même district et annexe existe déjà.', 'Erreur');
        } else {
        this.toastr.error(error.e, 'Erreur');}
      }
    );
  }

  goToEndroitList(): void {
    this.router.navigate(['/component/endroit']);
  }

  onSubmit(): void {
    this.saveEndroit();
  }

  private validateFields(): boolean {
    return (
      this.endroit.nom.trim() !== '' &&
      this.endroit.latitude !== 0 &&
      this.endroit.longitude !== 0 &&
      this.selectedDistrictId !== null &&
      this.endroit.categorie.id !== 0 && this.endroit.annexe.id!==0
    );
  }
}
