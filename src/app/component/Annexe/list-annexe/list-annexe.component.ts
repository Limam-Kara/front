import { AnnexeService } from 'src/app/services/annexe.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Annexe } from 'src/app/models/annexe';
import { ToastrService } from 'ngx-toastr';
import { EndroitService } from 'src/app/services/endroit.service';
import { Endroit } from 'src/app/models/endroit';
declare var bootstrap: any;

@Component({
  selector: 'app-list-annexe',
  templateUrl: './list-annexe.component.html',
  styleUrls: ['./list-annexe.component.scss'],
})
export class ListAnnexeComponent {
  annexes!: Annexe[];
  searchText: string = '';
  filteredAnnexes: Annexe[] = [];
  categorieToDeleteId: number | null = null;
  filteredEndroits: Endroit[] = [];
  endroits: Endroit[] = [];

  constructor(
    private toastr: ToastrService,
    private annexeservice: AnnexeService,
    private router: Router,
    private endroitService: EndroitService
  ) {}
  ngOnInit(): void {
    this.getAllAnnexe();
    this.getAllEndroit();
  }
  private getAllAnnexe() {
    this.annexeservice.getAllAnnexe().subscribe((data) => {
      console.log(data);
      this.annexes = data;
      this.filteredAnnexes = data;
    });
  }
  updateAnnexe(id: number) {
    this.router.navigate(['/component/update-annexe', id]);
  }
  getAllEndroit() {
    this.endroitService.getAllEndroit().subscribe((data) => {
      console.log(data);
      this.endroits = data;
      this.filteredEndroits = data;
      // this.initMap();
      // this.refreshMarkers();
    });
  }
  deleteAnnexe(id: number) {
    


    this.annexeservice.deleteAnnexe(id).subscribe((data) => {
      console.log(data);
      this.getAllAnnexe();
      const modalElement = document.getElementById('ST');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
      this.toastr.success('Annexe supprimée avec succès', 'Succès');
    });
  }
  annexeDetails(id: number) {
    this.router.navigate(['/component/annexe-details', id]);
  }
  searchAnnexes(): void {
    if (this.searchText.trim() === '') {
      // Reset to display all districts if search text is empty
      this.filteredAnnexes = this.annexes;
      return;
    }

    const searchTextLower = this.searchText.toLowerCase();
    this.filteredAnnexes = this.annexes.filter(
      (annexe) =>
        annexe.id.toString().includes(searchTextLower) ||
        annexe.nom.toLowerCase().includes(searchTextLower) ||
        annexe.adresse.toLowerCase().includes(searchTextLower)
    );
  }

  goToAddAnnexePage(): void {
    this.router.navigate(['/component/create-annexe']);
  }
  setAnnexeToDeleteId(id: number) {
    this.categorieToDeleteId = id;
  }

  confirmDelete() {
    if (this.categorieToDeleteId !== null) {
      this.deleteAnnexe(this.categorieToDeleteId);
      this.categorieToDeleteId = null; // Reset the variable after deletion
    }
  }
}
