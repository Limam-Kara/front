import { Component, AfterViewInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;

  constructor(public authService: UserAuthService) {
    this.subtitle = 'This is some text within a card block.';
   }
  ngAfterViewInit() { }
}
