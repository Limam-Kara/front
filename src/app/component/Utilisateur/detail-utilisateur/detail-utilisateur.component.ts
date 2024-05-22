import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/Role';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.scss']
})
export class DetailUtilisateurComponent {
  id!: number
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
  roles:Role[]=[]
  constructor(private route: ActivatedRoute,private utilisateurService: UtilisateurService,private router: Router,) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getAllRoles();
  }
  private getAllRoles() {
    this.utilisateurService.getUtilisateurById(this.id).subscribe(data => {
      console.log(data);
      this.utilisateur = data;
    });
  }
  goToUtilisateurPage(): void {
    this.router.navigate(['/component/utilisateur']);
  }
  onSubmit(): void {


    console.log(this.utilisateur);

    // Save the Utilisateur
    this.utilisateurService.saveUtilisateur(this.utilisateur).subscribe(
      (response) => {
        console.log('Utilisateur added successfully:', response);
        this.goToUtilisateurPage();
      },
      (error) => {
        console.log( error);
      }
    );
  }
}
