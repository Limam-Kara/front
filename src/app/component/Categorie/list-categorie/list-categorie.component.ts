import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/models/categorie';
import { Endroit } from 'src/app/models/endroit';
import { CategorieService } from 'src/app/services/categorie.service';
import { EndroitService } from 'src/app/services/endroit.service';
declare var bootstrap: any;

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss'],
})
export class ListCategorieComponent {
  categories: Categorie[] = [];
  filteredCategories: Categorie[] = [];
  searchText: string = '';
  categorieToDeleteId: number | null = null; // variable to store the ID of the district to delete
  filteredEndroits: Endroit[] = [];
  endroits: Endroit[] = [];
  constructor(
    private toastr: ToastrService,
    private categorieservice: CategorieService,
    private router: Router,
    private endroitService: EndroitService
  ) {}

  ngOnInit(): void {
    this.getAllCategorie();
  }

  private getAllCategorie() {
    this.categorieservice.getAllCategorie().subscribe((data) => {
      this.categories = data;
      this.filteredCategories = data;
    });
  }

  updateCategorie(id: number) {
    this.router.navigate(['/component/update-categorie', id]);
  }

  deleteCategorie(id: number) {
    // const t = this.filteredEndroits.filter((r) => {
    //   r.categorie.id == id && r.utilisateur.idRole.id != 1;
    // });
    // t.forEach((z) => {
    //   if (z?.id) {
    //     this.endroitService.deleteEndroit(z.id).subscribe((d) => {
    //       console.log('endroit supp', z);
    //     });
    //   }
    // });
    this.categorieservice.deleteCategorie(id).subscribe((data) => {
      console.log(data);
      this.getAllCategorie();
      const modalElement = document.getElementById('ST');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
      this.toastr.success('Catégorie supprimée avec succès', 'Succès');
    });
  }

  categorieDetails(id: number) {
    this.router.navigate(['/component/categorie-details', id]);
  }

  searchCategories(): void {
    if (this.searchText.trim() === '') {
      // Reset to display all districts if search text is empty
      this.filteredCategories = this.categories;
      return;
    }

    const searchTextLower = this.searchText.toLowerCase();
    this.filteredCategories = this.categories.filter(
      (categorie) =>
        categorie.id.toString().includes(searchTextLower) ||
        categorie.nom.toLowerCase().includes(searchTextLower)
    );
  }

  goToAddCategoriePage(): void {
    this.router.navigate(['/component/create-categorie']);
  }

  // Method to set the district ID to be deleted
  setCategorieToDeleteId(id: number) {
    this.categorieToDeleteId = id;
  }

  // Method to delete the district when "Yes" is clicked
  confirmDelete() {
    if (this.categorieToDeleteId !== null) {
      this.deleteCategorie(this.categorieToDeleteId);
      this.categorieToDeleteId = null; // Reset the variable after deletion
    }
  }
}
