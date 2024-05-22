import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { Endroit } from 'src/app/models/endroit';
import { EndroitService } from 'src/app/services/endroit.service';


@Component({
  selector: 'app-detail-endroit-u',
  templateUrl: './detail-endroit-u.component.html',
  styleUrls: ['./detail-endroit-u.component.scss']
})
export class DetailEndroitUComponent {
  id!: number
  searchText: string = '';
  filteredEndroits: Endroit[] = [];
  private map!: L.Map;
  private centroid: L.LatLngExpression = [27.137, -13.145];
  endroits: Endroit[] = [];
  endroitToDeleteId: number | null = null;
  constructor(private route: ActivatedRoute, private endroitService: EndroitService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getAllEndroit();
  }

  getAllEndroit() {
    this.endroitService.getEndroitById(this.id).subscribe(data => {
      console.log(data);
      this.endroits.push(data);
      this.filteredEndroits.push(data);
      this.initMap();
      this.refreshMarkers();
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 14
    });

    const tiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  private refreshMarkers(): void {
    // Définir l'icône personnalisée
    const customIcon = L.icon({
      iconUrl: '../../../../assets/images/icon.png',
      iconSize: [25, 41], // Taille de l'icône
      iconAnchor: [12, 41], // Point d'ancrage de l'icône
      popupAnchor: [0, -41] // Point d'ancrage du popup par rapport à l'icône
    });

    // Ajouter des marqueurs pour chaque endroit avec l'icône personnalisée
    this.endroits.forEach(endroit => {
      console.log(endroit.latitude, endroit.longitude)
      L.marker([endroit.latitude, endroit.longitude], { icon: customIcon }).addTo(this.map).bindPopup(endroit.nom);
    });
  }

  searchEndroits(): void {
    console.log(this.searchText);
    if (this.searchText.trim() === '') {
      this.endroits = this.filteredEndroits;
    } else {
      const searchTextLower = this.searchText.toLowerCase();
      this.endroits = this.filteredEndroits.filter(endroit => {
        const idString = endroit.id.toString().toLowerCase();
        if (idString.includes(searchTextLower)) {
          return true;
        }
        if (endroit.nom && endroit.nom.toLowerCase().includes(searchTextLower)) {
          return true;
        }
        return false;
      });
    }
  }

  updateEndroit(id: number) {
    this.router.navigate(['/component/updateEndroit', id]);
  }

  deleteEndroit(id: number) {
    this.endroitService.deleteEndroit(id).subscribe(data => {
      console.log(data);
      this.getAllEndroit();
    });
  }
  setAnnexeToDeleteId(id: number) {
    this.endroitToDeleteId = id;
  }

  confirmDelete() {
    if (this.endroitToDeleteId !== null) {
      this.deleteEndroit(this.endroitToDeleteId);
      this.endroitToDeleteId = null; // Reset the variable after deletion
    }
  }
  goToEndroitPage(): void {
    this.router.navigate(['/component/endroit']);
  }
  endroitDetails(id: number) {
    this.router.navigate(['/component/endroitDetails', id]);
  }
  goToAddEndroitPage(): void {
    this.router.navigate(['/component/createEndroit']);
  }
}
