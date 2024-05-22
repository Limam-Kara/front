import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
export interface them {
  id: any;
  nom: any;
  endroits: any[];
}
@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.scss'],
})
export class UpdateCategorieComponent implements OnInit {
  id!: number;
  categorie: Categorie = new Categorie();
  upcat: them = {
    id: undefined,
    nom: undefined,
    endroits: [],
  };
  upcalistt:any[]=[]
  categories!: any;
  constructor(
    private categorieservice: CategorieService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.categorieservice.getCategorieById(this.id).subscribe(
      (data) => {
        this.categorie = data;
        this.categories = data;
      },
      (error) => {
        console.log(error);
        this.toastr.error(
          'Erreur lors de la récupération de la catégorie',
          'Erreur'
        );
      }
    );
  }

  goToCategoriesList() {
    this.router.navigate(['/component/categories']);
  }

  onSubmit() {
    if (this.validateFields()) {
      // this.categories.endroit
      for (let index = 0; index < this.categories.endroits.length; index++) {

       let b=
            {
              id: this.categories.endroits[index].id,
              nom: this.categories.endroits[index].nom,
              latitude: this.categories.endroits[index].latitude,
              longitude: this.categories.endroits[index].latitude,
              district: {
                id: this.categories.endroits[index].district.id,
              },
              annexe: {
                id: this.categories.endroits[index].annexe.id,
              },
              categorie: {
                id: this.categories.endroits[index].categorie.id,
                nom: this.categories.endroits[index].categorie.nom,
              },
              utilisateur: {
                id: this.categories.endroits[index].utilisateur.id,
              },
            }

          // console.log(b)
          this.upcalistt.push(b)

      }
      // console.log( this.upcalistt)

 this.upcat = {
          id: this.categories.id,
          nom: this.categories.nom,
          endroits:this.upcalistt

};      console.log( this.upcat)

      this.categorieservice.createCategorie( this.upcat).subscribe(
        (data) => {
          this.toastr.success('Catégorie mise à jour avec succès', 'Succès');
          this.goToCategoriesList();
        },
        (error) => {
          console.log(error);
          this.toastr.error('Erreur lors de la mise à jour de la catégorie', 'Erreur');
        }
      );
      // console.log('objet before', this.upcat);
      // console.log('objet lenght', this.categories.endroits.length);
      // console.log('objet lenght', this.categories.endroits);
      // console.log("objet update",this.categories)
    } else {
      this.toastr.warning(
        'Veuillez remplir tous les champs obligatoires',
        'Avertissement'
      );
    }
  }

  private validateFields(): boolean {
    return this.categorie.nom.trim() !== '';
  }
}
