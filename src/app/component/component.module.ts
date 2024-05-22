import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { ListDistrictComponent } from './District/list-district/list-district.component';
import { CreateDistrictComponent } from './District/create-district/create-district.component';
import { UpdateDistrictComponent } from './District/update-district/update-district.component';
import { DetailDistrictComponent } from './District/detail-district/detail-district.component';
import { DetailCategorieComponent } from './Categorie/detail-categorie/detail-categorie.component';
import { ListCategorieComponent } from './Categorie/list-categorie/list-categorie.component';
import { CreateCategorieComponent } from './Categorie/create-categorie/create-categorie.component';
import { UpdateCategorieComponent } from './Categorie/update-categorie/update-categorie.component';
import { UpdateAnnexeComponent } from './Annexe/update-annexe/update-annexe.component';
import { CreateAnnexeComponent } from './Annexe/create-annexe/create-annexe.component';
import { DetailAnnexeComponent } from './Annexe/detail-annexe/detail-annexe.component';
import { ListAnnexeComponent } from './Annexe/list-annexe/list-annexe.component';
import { ListEndroitComponent } from './Endroit/list-endroit/list-endroit.component';
import { CreatEndroitComponent } from './Endroit/creat-endroit/creat-endroit.component';
import { UpdateEndroitComponent } from './Endroit/update-endroit/update-endroit.component';
import { DetailEndroitComponent } from './Endroit/detail-endroit/detail-endroit.component';
import { CreateUtilisateurComponent } from './Utilisateur/create-utilisateur/create-utilisateur.component';
import { ListUtilisateurComponent } from './Utilisateur/list-utilisateur/list-utilisateur.component';
import { ModifierUtilisateurComponent } from './Utilisateur/modifier-utilisateur/modifier-utilisateur.component';
import { DetailUtilisateurComponent } from './Utilisateur/detail-utilisateur/detail-utilisateur.component';
import { DetailEndroitUComponent } from './Endroit/detail-endroit-u/detail-endroit-u.component';
import { UpdateEndroitUComponent } from './Endroit/update-endroit-u/update-endroit-u.component';
import { CreatEndroitUComponent } from './Endroit/creat-endroit-u/creat-endroit-u.component';
import { ListEndroitUComponent } from './Endroit/list-endroit-u/list-endroit-u.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    ListDistrictComponent,
    CreateDistrictComponent,
    UpdateDistrictComponent,
    DetailDistrictComponent,
    DetailCategorieComponent,
    ListCategorieComponent,
    CreateCategorieComponent,
    UpdateCategorieComponent,
    UpdateAnnexeComponent,
    CreateAnnexeComponent,
    DetailAnnexeComponent,
    ListAnnexeComponent,
    ListEndroitComponent,
    CreatEndroitComponent,
    UpdateEndroitComponent,
    DetailEndroitComponent,
    CreateUtilisateurComponent,
    ListUtilisateurComponent,
    ModifierUtilisateurComponent,
    DetailUtilisateurComponent,
    DetailEndroitUComponent,
    UpdateEndroitUComponent,
    CreatEndroitUComponent,
    ListEndroitUComponent
  ],
})
export class ComponentsModule { }
