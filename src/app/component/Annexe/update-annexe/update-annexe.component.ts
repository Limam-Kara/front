import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Annexe } from 'src/app/models/annexe';
import { District } from 'src/app/models/district';
import { Endroit } from 'src/app/models/endroit';
import { AnnexeService } from 'src/app/services/annexe.service';
import { DistrictService } from 'src/app/services/district.service';
import { EndroitService } from 'src/app/services/endroit.service';
export interface them {
  id: any;
  nom: any;
  latitude: any;
  longitude: any;
  district: {
    id: any;
    nom: any;
  };
  annexe: {
    id: any;
    nom: any;
    adresse: any;
    district: any;
  };
  categorie: {
    id: any;
    nom: any;
  };
  utilisateur: {
    id: any;
    idRole: {
      id: any;
      nom: any;
      description: any;
    };
    district: {
      id: any;
      nom: any;
    };
  };
}
@Component({
  selector: 'app-update-annexe',
  templateUrl: './update-annexe.component.html',
  styleUrls: ['./update-annexe.component.scss'],
})
export class UpdateAnnexeComponent implements OnInit {
  id!: number;
  annexe: Annexe = { id: 0, nom: '', adresse: '', district: {} as District };
  districts: District[] = [];
  endroits: Endroit[] = [];
  //  endroits: Endroit[] = [];
  filteredEndroits: Endroit[] = [];
  them: any = {
    id: undefined,
    nom: undefined,
    latitude: undefined,
    longitude: undefined,
    district: {
      id: undefined,
    },
    annexe: {
      id: undefined,
      nom: undefined,
      adresse: undefined,
      district: undefined,
    },
    categorie: {
      id: undefined,
      nom: undefined,
    },
    utilisateur: {
      id: undefined,
      idRole: {
        id: undefined,
        nom: undefined,
        description: undefined,
      },
      district: {
        id: 5,
        nom: '',
      },
    },
  };
  listthem: them[] = [];
  constructor(
    private toastr: ToastrService,
    private districtservice: DistrictService,
    private annexeservice: AnnexeService,
    private route: ActivatedRoute,
    private router: Router,
    private endroitService: EndroitService
  ) {}

  ngOnInit(): void {
    this.loadenfroit();
    this.id = this.route.snapshot.params['id'];
    this.annexeservice.getAnnexeById(this.id).subscribe(
      (data) => {
        this.annexe = data;
        if (!this.annexe.district) {
          this.annexe.district = {} as District;
        }
      },
      (error) => {
        console.error(error);
        this.toastr.error(
          "Erreur lors de la récupération de l'annexe",
          'Erreur'
        );
      }
    );
    this.getAllDistrict();
  }
  loadenfroit() {
    this.endroitService
      .getAllEndroit()
      .subscribe((t) => (this.filteredEndroits = t));
  }
  goToAnnexeList() {
    this.router.navigate(['/component/annexes']);
  }

  onSubmit() {
    if (this.validateFields()) {
      this.annexe.id = this.id;
      // this.filteredEndroits.filter((t) => (t.annexe.id = this.id));
      // // console.log('annexe', this.annexe);
      console.log('endroit filtred ', this.filteredEndroits);
      // let anx = {
      //   id: this.annexe.id,
      //   nom: this.annexe.nom,
      //   adresse: this.annexe.adresse,
      //   district: {
      //     id: this.annexe.district.id,
      //     nom: this.annexe.district.nom,
      //   },
      //   endroits: [],
      // };
      // this.annexeservice.createAnnexe(anx).subscribe();

      this.filteredEndroits.forEach((z) => {
        z.annexe.adresse = this.annexe.adresse;
        z.annexe.district = this.annexe.district;
        z.annexe.nom = this.annexe.nom;
        // console.log('hsidhfhfuisd', z);
        if (z.annexe.id == this.id) {
          this.endroits.push(z);
          this.them = {
            id: z.id,
            nom: z.nom,
            latitude: z.latitude,
            longitude: z.longitude,
            district: {
              id: z.district.id,
              nom: '',
            },
            annexe: {
              id: z.annexe.id,
              nom: z.annexe.nom,
              adresse: z.annexe.adresse,
              district: z.annexe.district,
            },
            categorie: {
              id: z.categorie.id,
              nom: '',
            },
            utilisateur: {
              id: z.utilisateur.id,
            },
          };
          this.endroitService.createEndroit(this.them).subscribe(
            (data) => {
              this.toastr.success('Annexe mise à jour avec succès', 'Succès');
              console.log('eeeee', data);
              // this.goToAnnexeList();
            },
            (error) => {
              console.error(error);
              this.toastr.error(
                "Échec de la mise à jour de l'annexe",
                'Erreur'
              );
            }
          );

          // this.endroitService.deleteEndroit(z.id).subscribe();
        }
      });

      // this.annexeservice.deleteAnnexe(this.id).subscribe();
      // console.log("annx object ",anx)
      // console.log("first annx object ",this.annexe)

      // this.listthem.forEach((t) => {

      //   // console.log('ezre',t)
      // });
    } else {
      this.toastr.warning(
        'Veuillez remplir tous les champs obligatoires',
        'Avertissement'
      );
    }
  }

  private getAllDistrict() {
    this.districtservice.getAllDistrict().subscribe((data) => {
      this.districts = data;
    });
  }

  private validateFields(): boolean {
    return (
      this.annexe.nom.trim() !== '' &&
      this.annexe.adresse.trim() !== '' &&
      this.annexe.district.id !== 0
    );
  }
}
