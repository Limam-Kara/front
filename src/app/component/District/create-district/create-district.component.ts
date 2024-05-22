import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { District } from 'src/app/models/district';
import { DistrictService } from 'src/app/services/district.service';

@Component({
  selector: 'app-create-district',
  templateUrl: './create-district.component.html',
  styleUrls: ['./create-district.component.scss']
})
export class CreateDistrictComponent implements OnInit {
  district: District = { id: 0, nom: '' };

  constructor(
    private toastr: ToastrService,
    private districtservice: DistrictService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveDistrict() {
    if (this.validateFields()) {
      this.districtservice.createDistrict(this.district).subscribe(
        (data) => {
          console.log(data);
          this.toastr.success('District créé avec succès', 'Succès');
          this.goToDistrictList();
        },
        (error) => {
          console.error(error);
          this.toastr.error('Erreur lors de la création du district', 'Erreur');
        }
      );
    } else {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires', 'Avertissement');
    }
  }

  goToDistrictList() {
    this.router.navigate(['/component/districts']);
  }

  onSubmit() {
    console.log(this.district);
    this.saveDistrict();
  }

  private validateFields(): boolean {
    return this.district.nom.trim() !== '';
  }
}
