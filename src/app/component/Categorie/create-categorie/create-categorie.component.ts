import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-create-categorie',
  templateUrl: './create-categorie.component.html',
  styleUrls: ['./create-categorie.component.scss']
})
export class CreateCategorieComponent implements OnInit {
  categorie: Categorie = { id: 0, nom: '' };

  constructor(
    private categorieservice: CategorieService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  saveCategorie() {
    if (this.validateFields()) {
      this.categorieservice.createCategorie(this.categorie).subscribe(
        (data) => {
          this.toastr.success('Catégorie créée avec succès', 'Succès');
          this.goToCategoriesList();
        },
        (error) => {
          console.error(error);
          this.toastr.error('Erreur lors de la création de la catégorie', 'Erreur');
        }
      );
    } else {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires', 'Avertissement');
    }
  }

  goToCategoriesList() {
    this.router.navigate(['/component/categories']);
  }

  onSubmit() {
    console.log(this.categorie);
    this.saveCategorie();
  }

  private validateFields(): boolean {
    return this.categorie.nom.trim() !== '';
  }
}
