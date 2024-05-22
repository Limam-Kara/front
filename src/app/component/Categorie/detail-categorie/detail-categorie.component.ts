import { CategorieService } from 'src/app/services/categorie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/models/categorie';

@Component({
  selector: 'app-detail-categorie',
  templateUrl: './detail-categorie.component.html',
  styleUrls: ['./detail-categorie.component.scss']
})
export class DetailCategorieComponent {
  id!: number
  categorie!: Categorie
  constructor(private route: ActivatedRoute, private categorieservice: CategorieService,private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.categorie = new Categorie();
    this.categorieservice.getCategorieById(this.id).subscribe(data => {
      this.categorie = data;
    });
  }
  goToCategoriesList() {
    this.router.navigate(['/component/categories']);
  }
}
