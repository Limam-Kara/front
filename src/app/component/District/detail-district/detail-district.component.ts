import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Annexe } from 'src/app/models/annexe';
import { District } from 'src/app/models/district';
import { AnnexeService } from 'src/app/services/annexe.service';
import { DistrictService } from 'src/app/services/district.service';

@Component({
  selector: 'app-detail-district',
  templateUrl: './detail-district.component.html',
  styleUrls: ['./detail-district.component.scss']
})
export class DetailDistrictComponent {
  id!: number
  district!: District
  constructor(private route: ActivatedRoute, private districtservice: DistrictService,private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.district = new District();
    this.districtservice.getDistrictById(this.id).subscribe(data => {
      this.district = data;
    });
  }
  goToDistrictList(){
    this.router.navigate(['/component/districts']);
      }
}
