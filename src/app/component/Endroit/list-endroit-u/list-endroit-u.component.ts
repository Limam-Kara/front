import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';
import { Endroit } from 'src/app/models/endroit';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { EndroitService } from 'src/app/services/endroit.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
declare var bootstrap: any;
@Component({
  selector: 'app-list-endroit-u',
  templateUrl: './list-endroit-u.component.html',
  styleUrls: ['./list-endroit-u.component.scss']
})
export class ListEndroitUComponent {
  searchText: string = '';
  filteredEndroits: Endroit[] = [];
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
  endroits: Endroit[] = [];
  endroitToDeleteId: number | null = null;
  constructor(private utilisateurService: UtilisateurService,private endroitService: EndroitService, private router: Router,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getAllEndroit();
    // this.getAuthenticatedUser();
  }

  getAllEndroit() {
    this.endroitService.getEndroitsByAuthenticatedUser().subscribe(data => {
      console.log(data);
      this.endroits = data;
      this.filteredEndroits = this.endroits;
    });
  }

  private getAuthenticatedUser() {
    this.utilisateurService.getAuthenticatedUser().subscribe(data => {
      console.log(data);
      this.utilisateur = data;
    });
  }

  searchEndroits(): void {
    console.log(this.searchText);
    if (this.searchText.trim() === '') {
      this.endroits = this.filteredEndroits;
    } else {
      const searchTextLower = this.searchText.toLowerCase();
      this.endroits = this.filteredEndroits.filter(endroit => {
        const idString = endroit.id.toString().toLowerCase();
        if (idString.includes(searchTextLower)) {
          return true;
        }
        if (endroit.nom && endroit.nom.toLowerCase().includes(searchTextLower)) {
          return true;
        }
        return false;
      });
    }
  }

  updateEndroit(id: number) {
    this.router.navigate(['/component/updateEndroit', id]);
  }

  deleteEndroit(id: number) {
    this.endroitService.deleteEndroit(id).subscribe(data => {
      console.log(data);
      this.getAllEndroit();
      const modalElement = document.getElementById('ST');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
      this.toastr.success('Endroit supprimée avec succès !', 'Succès');
    });
  }
  setAnnexeToDeleteId(id: number) {
    this.endroitToDeleteId = id;
  }

  confirmDelete() {
    if (this.endroitToDeleteId !== null) {
      this.deleteEndroit(this.endroitToDeleteId);
      this.endroitToDeleteId = null; // Reset the variable after deletion
    }
  }
  endroitDetails(id: number) {
    this.router.navigate(['/component/endroitDetails', id]);
  }
  goToAddEndroitPage(): void {
    this.router.navigate(['/component/createEndroit']);
  }
}
