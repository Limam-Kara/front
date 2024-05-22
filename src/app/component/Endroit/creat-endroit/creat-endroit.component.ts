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
import { Role } from './../../../models/Role';
export interface them {
  id: any,
  nom: any,
  latitude: any,
  longitude: any,
  district: {
      id: any,
      nom: any
  },
  annexe: {
      id: any

  },
  categorie: {
      id: any,
      nom: any
  },
  utilisateur: {
      id: any
  }
}

@Component({
  selector: 'app-creat-endroit',
  templateUrl: './creat-endroit.component.html',
  styleUrls: ['./creat-endroit.component.scss']
})
export class CreatEndroitComponent implements OnInit {
  endroit: Endroit = {
    id: 0,
    nom: '',
    latitude: 0,
    longitude: 0,
    district: { id: 0, nom: '' },
    annexe: {
      id: 0,
      nom: '',
      adresse: '',
      district: new District
    },
    categorie: {
      id: 0, nom: ''
    },
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
  }
  districts: District[] = [];
  districtsL: any[] = [];
  categories: Categorie[] = [];
  selectedDistrictId: number | null = null;
  selectedAnnexes: any[] = [];
them:any={
  id: undefined,
  nom: undefined,
  latitude: undefined,
  longitude: undefined,
  district: {
    id: undefined,
    nom: undefined
  },
  annexe: {
    id: undefined
  },
  categorie: {
    id: undefined,
    nom: undefined
  },
  utilisateur: {
    id: undefined
  }
}
  constructor(
    private utilisateurService: UtilisateurService,
    private endroitService: EndroitService,
    private router: Router,
    private districtService: DistrictService,
    private categorieService: CategorieService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllDistricts();
    this.getAllCategories();
    this.getAuthenticatedUser();
  }
  private getAuthenticatedUser() {
    this.utilisateurService.getAuthenticatedUser().subscribe(data => {
      console.log(data);
      this.utilisateur = data;
    });
  }
  getAllDistricts(): void {
    this.districtService.getAllDistrict().subscribe(
      (data: District[]) => {
        this.districts = data;
        this.districtsL = data;
        console.log('All districts:', this.districtsL);
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

  onDistrictChange(): void {
    console.log('Selected district ID:', this.selectedDistrictId);
    if (this.selectedDistrictId !== null) {
      const districtId = Number(this.selectedDistrictId);
      const selectedDistrict = this.districtsL.find(d => d.id === districtId);
      console.log('Selected district:', selectedDistrict);
      this.selectedAnnexes = selectedDistrict ? selectedDistrict.annexes || [] : [];
      console.log('Selected annexes:', this.selectedAnnexes);
    } else {
      console.log('No district selected');
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
    console.log('item db',this.endroit);
    this.them={
      id: this.endroit.id,
      nom: this.endroit.nom,
      latitude: this.endroit.latitude,
      longitude: this.endroit.longitude,
      district: {
        id: this.endroit.district.id,
        nom: ""
      },
      annexe: {
        id: this.endroit.annexe.id
      },
      categorie: {
        id: this.endroit.categorie.id,
        nom: ""
      },
      utilisateur: {
        id: this.endroit.utilisateur.id
      }
    }
    this.endroitService.createEndroit(this.them).subscribe(
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
    this.router.navigate(['/component/endroits']);
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
