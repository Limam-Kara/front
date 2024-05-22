import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Annexe } from 'src/app/models/annexe';
import { District } from 'src/app/models/district';
import { Endroit } from 'src/app/models/endroit';
import { AnnexeService } from 'src/app/services/annexe.service';
import { DistrictService } from 'src/app/services/district.service';
import { EndroitService } from 'src/app/services/endroit.service';
declare var bootstrap: any;

@Component({
  selector: 'app-list-district',
  templateUrl: './list-district.component.html',
  styleUrls: ['./list-district.component.scss']
})
export class ListDistrictComponent implements OnInit {
  districts: District[] = [];
  filteredDistricts: District[] = [];
  searchText: string = '';
  districtToDeleteId: number | null = null;
  filteredEndroits: Endroit[] = [];
  endroits: Endroit[] = [];
  annexes!: Annexe[];

  filteredAnnexes: Annexe[] = [];
  constructor(
    private toastr: ToastrService,
    private districtservice: DistrictService,
    private router: Router,
    private endroitService: EndroitService,
    private annexeservice: AnnexeService
  ) {}

  ngOnInit(): void {
    this.getAllDistrict();    this.getAllAnnexe();

  }
 
  private getAllDistrict() {
    this.districtservice.getAllDistrict().subscribe(data => {
      this.districts = data;
      this.filteredDistricts = data; // Initialize filteredDistricts with all districts
    });
  }
  private getAllAnnexe() {
    this.annexeservice.getAllAnnexe().subscribe((data) => {
      console.log(data);
      this.annexes = data;
      this.filteredAnnexes = data;
    });
  }
  updateDistrict(id: number) {
    this.router.navigate(['/component/update-district', id]);
  }

  deleteDistrict(id: number) {
       const t = this.filteredEndroits.filter((r) => {
      r.district.id == id && r.utilisateur.idRole.id != 1;
    });
    t.forEach((z) => {
      if (z?.id) {
        this.endroitService.deleteEndroit(z.id).subscribe((d) => {
          console.log('endroit supp', z);
        });
      }
    });
    const a = this.filteredAnnexes.filter((r) => {
      r.district.id == id
    });
    a.forEach((z) => {
      if (z?.id) {
        this.annexeservice.deleteAnnexe(z.id).subscribe((d) => {
          console.log('annex supp', d);
        });
      }
    });
    this.districtservice.deleteDistrict(id).subscribe(data => {
      console.log(data);
      this.getAllDistrict();
      const modalElement = document.getElementById('ST');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
      this.toastr.success('District supprimée avec succès', 'Succès');
    });
  }

  districtDetails(id: number) {
    this.router.navigate(['/component/district-details', id]);
  }

  searchDistricts(): void {
    if (this.searchText.trim() === '') {
      // Reset to display all districts if search text is empty
      this.filteredDistricts = this.districts;
      return;
    }

    const searchTextLower = this.searchText.toLowerCase();
    this.filteredDistricts = this.districts.filter(district =>
      district.id.toString().includes(searchTextLower) ||
      district.nom.toLowerCase().includes(searchTextLower)
    );
  }

  goToAddDistrictPage(): void {
    this.router.navigate(['/component/create-district']);
  }

  // Method to set the district ID to be deleted
  setDistrictToDeleteId(id: number) {
    this.districtToDeleteId = id;
  }

  // Method to delete the district when "Yes" is clicked
  confirmDelete() {
    if (this.districtToDeleteId !== null) {
      this.deleteDistrict(this.districtToDeleteId);
      this.districtToDeleteId = null; // Reset the variable after deletion
    }
  }
}
