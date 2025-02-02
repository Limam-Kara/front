import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';


import { NavigationComponent } from './shared/header/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './Authentification/login/login.component';
import { ForgetComponent } from './Authentification/forget/forget.component';
import { ResetComponent } from './Authentification/reset/reset.component';
import { JwtInterceptor } from './Interceptor/JwtInterceptor';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetComponent,
    ResetComponent,

 ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    ToastrModule.forRoot(
      {preventDuplicates: true,
        easing: 'ease-in',
        progressBar:true,
        closeButton: true,
        timeOut:3000
      }
    ),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
