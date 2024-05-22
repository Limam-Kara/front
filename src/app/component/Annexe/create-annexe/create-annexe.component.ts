import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Annexe } from 'src/app/models/annexe';
import { District } from 'src/app/models/district';
import { AnnexeService } from 'src/app/services/annexe.service';
import { DistrictService } from 'src/app/services/district.service';

@Component({
  selector: 'app-create-annexe',
  templateUrl: './create-annexe.component.html',
  styleUrls: ['./create-annexe.component.scss']
})
export class CreateAnnexeComponent implements OnInit {
  annexe: Annexe = {
    id: 0,
    nom: '',
    adresse: '',
    district: { id: 0, nom: '' }
  };
  districts!: District[];

  constructor(
    private toastr: ToastrService,
    private annexeservice: AnnexeService,
    private districtservice: DistrictService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDistrict();
  }

  saveAnnexe() {
    // Convert the district id to a number
    const districtId = Number(this.annexe.district.id);

    const selectedDistrict = this.districts.find(
      (district) => district.id === districtId
    );

    if (!selectedDistrict) {
      this.toastr.error('District sélectionné non trouvé', 'Erreur');
      return;
    }

    this.annexe.district = selectedDistrict;

    this.annexeservice.createAnnexe(this.annexe).subscribe(
      (data) => {
        this.toastr.success('Annexe créée avec succès', 'Succès');
        this.goToAnnexeList();
      },
      (error) => {
        this.toastr.error('Échec de la création de l\'annexe', 'Erreur');
        console.error(error);
      }
    );
  }

  goToAnnexeList() {
    this.router.navigate(['/component/annexes']);
  }

  onSubmit() {
    if (this.validateFields()) {
      this.saveAnnexe();
    } else {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires', 'Avertissement');
    }
  }

  private getAllDistrict() {
    this.districtservice.getAllDistrict().subscribe((data) => {
      this.districts = data;
    });
  }

  private validateFields(): boolean {
    return this.annexe.nom.trim() !== '' &&
           this.annexe.adresse.trim() !== '' &&
           this.annexe.district.id !== 0;
  }
}
