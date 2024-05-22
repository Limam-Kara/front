import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-update-endroit',
  templateUrl: './update-endroit.component.html',
  styleUrls: ['./update-endroit.component.scss']
})
export class UpdateEndroitComponent {
  id!: number;
  endroit: Endroit = {
    id: 0,
    nom: '',
    latitude: 0,
    longitude: 0,
    district: { id: 0, nom: '' },
    annexe: {
      id: 0, nom: '',
      adresse: '',
      district: new District
    },
    categorie: { id: 0, nom: '' },
    utilisateur: {
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
  successMessage: string = '';
  errorMessage: string = '';
  districts: District[] = [];
  districtsL: any[] = [];
  categories: Categorie[] = [];
  selectedDistrictId!: number ;
  selectedAnnexes: any[] = [];

  constructor(
    private utilisateurService: UtilisateurService,
    private endroitservice:EndroitService,
    private route: ActivatedRoute,
    private endroitService: EndroitService,
    private router: Router,
    private districtService: DistrictService,
    private categorieService: CategorieService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.endroitservice.getEndroitById(this.id).subscribe(data => {
      this.endroit = data;

        this.selectedDistrictId= this.endroit.district.id


      console.log(this.endroit )
    }, error => console.log(error));
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
      }
    );
  }

  getAllCategories(): void {
    this.categorieService.getAllCategorie().subscribe(
      (data: Categorie[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des categories : ', error);
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
    this.endroit.id = this.id;
    this.endroit.district.id = this.selectedDistrictId;

    if (this.utilisateur) {
      this.endroit.utilisateur = { id: this.utilisateur.id } as Utilisateur;
    } else {
      this.toastr.error('Utilisateur non authentifié', 'Erreur');
      return;
    }

    const { id, nom, latitude, longitude, district, annexe, categorie, utilisateur } = this.endroit;

    // Ensure annexe includes the district property
    const newEndroit :any = {
      id: id,
      nom: nom,
      latitude: latitude,
      longitude: longitude,
      district: {
        id: district.id,
        nom: district.nom
      },
      annexe: { // Adjusted annexe structure
        id: annexe.id,
        nom: annexe.nom,
        adresse: annexe.adresse,
        district: { // Include the district property in annexe
          id: annexe.district.id,
          nom: annexe.district.nom
        }
      },
      categorie: {
        id: categorie.id,
        nom: categorie.nom
      },
      utilisateur: {
        id: utilisateur.id
      }
    };

    console.log(newEndroit);
    this.endroitService.createEndroit(newEndroit).subscribe(
      data => {
        console.log(data);
        this.toastr.success('Endroit mis à jour avec succès !', 'Succès');
        this.goToEndroitList();
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          this.toastr.error('Un endroit avec le même district et annexe existe déjà.', 'Erreur');
        } else {
          this.toastr.error("Erreur lors de la mise à jour de l'endroit.", 'Erreur');
        }
      }
    );
  }



  goToEndroitList(): void {
    this.router.navigate(['/component/endroits']);
  }

  onSubmit(): void {
    this.saveEndroit();
  }
}
