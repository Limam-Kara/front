import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserAuthService } from 'src/app/services/user-auth.service';


@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  topcards: any[] = [];
  isAdmin: boolean = false;

  constructor(private authService: UserAuthService,private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.checkAdminRole()
    this.fetchStatistics();
  }
  checkAdminRole(): void {
    this.isAdmin = this.authService.getRole() === 'Admin';
  }
  fetchStatistics(): void {
    this.dashboardService.getStatistics().subscribe(
      data => {
        console.log(data)
        const allCards = [
          { title: 'Utilisateurs', subtitle: data.utilisateurs, bgcolor: 'primary', icon: 'bi bi-people-fill' },
          { title: 'Annexes', subtitle: data.annexes, bgcolor: 'info', icon: 'bi bi-building' },
          { title: 'Districts', subtitle: data.districts, bgcolor: 'success', icon: 'bi bi-buildings-fill' },
          { title: 'Catégories', subtitle: data.categories, bgcolor: 'warning', icon: 'bi bi-c-circle-fill' },
          { title: 'Endroits', subtitle: data.endroits, bgcolor: 'danger', icon: 'bi bi-geo-alt-fill' }
        ];

        if (this.isAdmin) {
          this.topcards = allCards.filter(card =>card.title !== 'Endroits');
        } else {
          this.topcards = allCards.filter(card => card.title === 'Catégories'|| card.title === 'Endroits');
        }
      },
      error => {
        console.error('Error fetching statistics:', error);
        // Handle error if needed
      }
    );
  }
}
