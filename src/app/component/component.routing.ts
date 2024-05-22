import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ListDistrictComponent } from './District/list-district/list-district.component';
import { UpdateDistrictComponent } from './District/update-district/update-district.component';
import { CreateDistrictComponent } from './District/create-district/create-district.component';
import { DetailDistrictComponent } from './District/detail-district/detail-district.component';
import { ListCategorieComponent } from './Categorie/list-categorie/list-categorie.component';
import { CreateCategorieComponent } from './Categorie/create-categorie/create-categorie.component';
import { UpdateCategorieComponent } from './Categorie/update-categorie/update-categorie.component';
import { DetailCategorieComponent } from './Categorie/detail-categorie/detail-categorie.component';
import { ListAnnexeComponent } from './Annexe/list-annexe/list-annexe.component';
import { CreateAnnexeComponent } from './Annexe/create-annexe/create-annexe.component';
import { UpdateAnnexeComponent } from './Annexe/update-annexe/update-annexe.component';
import { DetailAnnexeComponent } from './Annexe/detail-annexe/detail-annexe.component';
import { ListEndroitComponent } from './Endroit/list-endroit/list-endroit.component';
import { CreatEndroitComponent } from './Endroit/creat-endroit/creat-endroit.component';
import { UpdateEndroitComponent } from './Endroit/update-endroit/update-endroit.component';
import { DetailEndroitComponent } from './Endroit/detail-endroit/detail-endroit.component';
import { ListUtilisateurComponent } from './Utilisateur/list-utilisateur/list-utilisateur.component';
import { CreateUtilisateurComponent } from './Utilisateur/create-utilisateur/create-utilisateur.component';
import { ModifierUtilisateurComponent } from './Utilisateur/modifier-utilisateur/modifier-utilisateur.component';
import { DetailUtilisateurComponent } from './Utilisateur/detail-utilisateur/detail-utilisateur.component';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { ListEndroitUComponent } from './Endroit/list-endroit-u/list-endroit-u.component';
import { CreatEndroitUComponent } from './Endroit/creat-endroit-u/creat-endroit-u.component';
import { UpdateEndroitUComponent } from './Endroit/update-endroit-u/update-endroit-u.component';
import { DetailEndroitUComponent } from './Endroit/detail-endroit-u/detail-endroit-u.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'Bilan',
				component: DashboardComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
			{
				path: 'districts',
				component: ListDistrictComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
			{
				path: 'update-district/:id',
				component: UpdateDistrictComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
			{
				path: 'create-district',
				component: CreateDistrictComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
			{
				path: 'district-details/:id',
				component: DetailDistrictComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
			{
				path: 'categories',
				component: ListCategorieComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
			{
				path: 'create-categorie',
				component: CreateCategorieComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
			{
				path: 'update-categorie/:id',
				component: UpdateCategorieComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
      {
				path: 'categorie-details/:id',
				component: DetailCategorieComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
      {
				path: 'annexes',
				component: ListAnnexeComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
      {
				path: 'create-annexe',
				component: CreateAnnexeComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
      {
				path: 'update-annexe/:id',
				component: UpdateAnnexeComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
      {
				path: 'annexe-details/:id',
				component: DetailAnnexeComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
      {
				path: 'endroits',
				component: ListEndroitComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin', 'User'] }
			},
      {
				path: 'create-endroit',
				component: CreatEndroitComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin', 'User'] }
			},
      {
				path: 'update-endroit/:id',
				component: UpdateEndroitComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin', 'User'] }
			},
      {
				path: 'endroit-details/:id',
				component: DetailEndroitComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin', 'User'] }
			},
      {
				path: 'endroit',
				component: ListEndroitUComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin', 'User'] }
			},
      {
				path: 'createEndroit',
				component: CreatEndroitUComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['User'] }
			},
      {
				path: 'updateEndroit/:id',
				component: UpdateEndroitUComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: [ 'User'] }
			},
      {
				path: 'endroitDetails/:id',
				component: DetailEndroitUComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['User'] }
			},
      {
				path: 'utilisateur',
				component: ListUtilisateurComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
      {
				path: 'create-utilisateur',
				component: CreateUtilisateurComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
      {
				path: 'update-utilisateur/:id',
				component: ModifierUtilisateurComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			},
      {
				path: 'details-utilisateur/:id',
				component: DetailUtilisateurComponent,
        canActivate: [AuthorizationGuard], // Add canActivate property with AuthorizationGuard
        data: { roles: ['Admin'] }
			}
		]
	}
];
