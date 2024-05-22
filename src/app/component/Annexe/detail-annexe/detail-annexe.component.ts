import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Annexe } from 'src/app/models/annexe';
import { District } from 'src/app/models/district';
import { AnnexeService } from 'src/app/services/annexe.service';
import { DistrictService } from 'src/app/services/district.service';

@Component({
  selector: 'app-detail-annexe',
  templateUrl: './detail-annexe.component.html',
  styleUrls: ['./detail-annexe.component.scss']
})
export class DetailAnnexeComponent {
  id!: number;
  annexe: Annexe = {id:0 , nom: '', adresse: '', district: {} as District };

  constructor(
    private toastr: ToastrService,
    private annexeservice: AnnexeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.annexeservice.getAnnexeById(this.id).subscribe(
      (data) => {
        this.annexe = data;
        if (!this.annexe.district) {
          this.annexe.district = {} as District;
        }
      },
      (error) => console.log(error)
    );

  }

  goToAnnexeList() {
    this.router.navigate(['/component/annexes']);
  }

}
