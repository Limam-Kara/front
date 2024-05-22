import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Annexe } from 'src/app/models/annexe';
import { District } from 'src/app/models/district';
import { Endroit } from 'src/app/models/endroit';
import { AnnexeService } from 'src/app/services/annexe.service';
import { DistrictService } from 'src/app/services/district.service';
import { EndroitService } from 'src/app/services/endroit.service';
interface them {
  id: number;
  nom: string;
  annexes: any;
  utilisateurs: any;
}
@Component({
  selector: 'app-update-district',
  templateUrl: './update-district.component.html',
  styleUrls: ['./update-district.component.scss'],
})
export class UpdateDistrictComponent implements OnInit {
  id!: number;
  district: District = new District();
  filteredEndroits: Endroit[] = [];
  endroits: Endroit[] = [];
  districts: them = {
    id: 0,
    nom: '',
    annexes: [],
    utilisateurs: [],
  };

  annexes: Annexe[] = [];
  annexe: Annexe[] = [];
  filteredDistricts: District[] = [];

  filteredAnnexes: Annexe[] = [];
  constructor(
    private toastr: ToastrService,
    private districtservice: DistrictService,
    private route: ActivatedRoute,
    private router: Router,
    private endroitService: EndroitService,
    private annexeservice: AnnexeService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getAllAnnexe();
    this.endroitService.getAllEndroit().subscribe((t) => {
      this.filteredEndroits = t;
    });

    this.districtservice.getDistrictById(this.id).subscribe(
      (data) => {
        this.district = data;
      },
      (error) => {
        console.log(error);
        this.toastr.error(
          'Erreur lors de la récupération du district',
          'Erreur'
        );
      }
    );
    // console.log('dfdfdf', this.id);
  }

  goToDistrictList() {
    this.router.navigate(['/component/districts']);
  }

  private getAllAnnexe() {
    this.annexeservice.getAllAnnexe().subscribe((data) => {
      this.filteredAnnexes = data;
    });
  }
  onSubmit() {
    if (this.validateFields()) {
      // console.log('id districte', this.id);

      // this.filteredEndroits.forEach((t) => {
      //   if (t.district.id == this.id) {
      //     this.endroits.push(t);
      //     // this.endroitService
      //     //   .deleteEndroit(t.id)
      //     //   .subscribe((r) => console.log('supp id', t.id));
      //   }
      // });
      // console.log('list endroit  ', this.filteredEndroits);
      // console.log('list endroit filtred ', this.endroits);
      // this.filteredAnnexes.forEach((t) => {
      //   if (t.district.id == this.id) {
      //     this.annexe.push(t);
      //     // this.annexeservice
      //     //   .deleteAnnexe(t.id)
      //     //   .subscribe((r) => console.log('supp id', t.id));
      //   }
      // });
      // console.log('list annexe  ', this.filteredAnnexes);
      // console.log('list annexe filtred ', this.annexe);
      // console.log('---ùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùù----------------- ');

      // this.endroits.forEach((z) => {
      //   if (z?.id) {
      //     z.district=this.district
      //     this.endroitService.createEndroit(z).subscribe((d) => {
      //       console.log('endroit update', d);
      //     });
      //   }
      // });
      // this.annexe.forEach((z) => {
      //   if (z?.id) {
      //     z.district=this.district
      //     this.annexeservice.createAnnexe(z).subscribe((d) => {
      //       console.log('annex update', d);
      //     });
      //   }
      // });
      this.districts = {
        id: this.id,
        nom: this.district.nom,
        annexes: [],
        utilisateurs: [],
      };
      console.log(this.districts);
      this.districtservice.createDistrict( this.districts).subscribe(
        (data) => {
          this.toastr.success('District mis à jour avec succès', 'Succès');
          this.goToDistrictList();
        },
        (error) => {
          console.log(error);
          this.toastr.error(
            'Erreur lors de la mise à jour du district',
            'Erreur'
          );
        }
      );
    } else {
      this.toastr.warning(
        'Veuillez remplir tous les champs obligatoires',
        'Avertissement'
      );
    }
  }

  private validateFields(): boolean {
    return this.district.nom.trim() !== '';
  }
  goToAnnexeList() {
    this.router.navigate(['/component/districts']);
  }
}
