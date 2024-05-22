import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { Endroit } from 'src/app/models/endroit';
import { EndroitService } from 'src/app/services/endroit.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
declare var bootstrap: any;
@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.scss'],
})
export class ListUtilisateurComponent {
  utilisateurs!: Utilisateur[];
  searchText: string = '';
  filteredUtilisateur: Utilisateur[] = [];
  utilisateurToDeleteId: number | null = null;
  districtToDeleteId: number | null = null;
  filteredEndroits: Endroit[] = [];

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
    private toastr: ToastrService,
    private endroitService: EndroitService
  ) {}
  ngOnInit(): void {
    this.getAllUtilisateurs();
    this.loadenfroit();
  }
  private getAllUtilisateurs() {
    this.utilisateurService.getAllUtilisateurs().subscribe((data) => {
      this.utilisateurs = data.filter((user) => user.idRole?.nom === 'User');
      this.filteredUtilisateur = this.utilisateurs;
    });
  }
  updateUtilisateur(id: number) {
    this.router.navigate(['/component/update-utilisateur', id]);
  }
  loadenfroit() {
    this.endroitService
      .getAllEndroit()
      .subscribe((t) => (this.filteredEndroits = t));
  }
  deleteUtilisateur(id: number) {
    // const t = this.filteredEndroits.filter((r) => {
    //   r.utilisateur.id == id;
    // });
    this.filteredEndroits.forEach((z) => {
      if (z.utilisateur.id == id) {
        this.endroitService.deleteEndroit(z.id).subscribe((d) => {
          console.log('endroit supp', z);
        });
        // console.log(z);
      }
    });
    this.utilisateurService.deleteUtilisateur(id).subscribe(data => {
      console.log(data);
      this.getAllUtilisateurs();
      const modalElement = document.getElementById('ST');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
      this.toastr.success('Utilisateur supprimée avec succès!', 'Succès');
    })
  }
  utilisateurDetails(id: number) {
    this.router.navigate(['/component/details-utilisateur', id]);
  }
  searchUtilisateur(): void {
    if (this.searchText.trim() === '') {
      // Reset to display all utilisateurs if search text is empty
      this.filteredUtilisateur = this.utilisateurs;
      return;
    }

    const searchTextLower = this.searchText.toLowerCase();
    this.filteredUtilisateur = this.utilisateurs.filter(
      (utilisateur) =>
        (utilisateur.id &&
          utilisateur.id.toString().includes(searchTextLower)) ||
        (utilisateur.nom &&
          utilisateur.nom.toLowerCase().includes(searchTextLower)) ||
        (utilisateur.adresse &&
          utilisateur.adresse.toLowerCase().includes(searchTextLower))
    );
  }
  goToAddUtilisateurPage(): void {
    this.router.navigate(['/component/create-utilisateur']);
  }
  setUtilisateurToDeleteId(id: number) {
    this.utilisateurToDeleteId = id;
  }
  confirmDelete() {
    if (this.utilisateurToDeleteId !== null) {
      this.deleteUtilisateur(this.utilisateurToDeleteId);
      this.utilisateurToDeleteId = null; // Reset the variable after deletion
    }
  }
}
