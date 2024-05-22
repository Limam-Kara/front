import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './Authentification/login/login.component';
import { ForgetComponent } from './Authentification/forget/forget.component';
import { ResetComponent } from './Authentification/reset/reset.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/Login', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      }
    ]
  },
  {path:'Login',component:LoginComponent},
  {path:'Forget',component:ForgetComponent},
  {path:'Reset',component:ResetComponent},
];
