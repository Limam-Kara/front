import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutService } from 'src/app/services/logout.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

declare var $: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports:[NgbDropdownModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent  {
  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;

  constructor(private logoutService:  LogoutService,private authService: UserAuthService,private router: Router) {
  }

  logout(): void {
    this.logoutService.logout().subscribe(
      () => {
        this.authService.clear();
        this.router.navigate(['/Login']); // Redirect to login page after successful logout
      },
      error => {
        console.error('Logout failed:', error);
      }
    );
  }
}
