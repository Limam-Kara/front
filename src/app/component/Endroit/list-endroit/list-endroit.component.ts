import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';
import { Endroit } from 'src/app/models/endroit';
import { EndroitService } from 'src/app/services/endroit.service';
declare var bootstrap: any;
@Component({
  selector: 'app-list-endroit',
  templateUrl: './list-endroit.component.html',
  styleUrls: ['./list-endroit.component.scss']
})
export class ListEndroitComponent {
  searchText: string = '';
  filteredEndroits: Endroit[] = [];
  private map!: L.Map;
  private centroid: L.LatLngExpression = [27.137, -13.145];
  endroits: Endroit[] = [];
  endroitToDeleteId: number | null = null;
  constructor(private endroitService: EndroitService, private router: Router,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getAllEndroit();
  }

  getAllEndroit() {
    this.endroitService.getAllEndroit().subscribe(data => {
      console.log(data);
      this.endroits = data;
      this.filteredEndroits = data;
      // this.initMap();
      // this.refreshMarkers();
    });
  }

  // private initMap(): void {
  //   this.map = L.map('map', {
  //     center: this.centroid,
  //     zoom: 12
  //   });

  //   const tiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 18,
  //     minZoom: 10,
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   });

  //   tiles.addTo(this.map);
  // }

  // private refreshMarkers(): void {
  //   // Définir l'icône personnalisée
  //   const customIcon = L.icon({
  //     iconUrl: '../../../../assets/images/icon.png',
  //     iconSize: [25, 41], // Taille de l'icône
  //     iconAnchor: [12, 41], // Point d'ancrage de l'icône
  //     popupAnchor: [0, -41] // Point d'ancrage du popup par rapport à l'icône
  //   });

  //   // Ajouter des marqueurs pour chaque endroit avec l'icône personnalisée
  //   this.endroits.forEach(endroit => {
  //     L.marker([endroit.latitude, endroit.longitude], { icon: customIcon }).addTo(this.map).bindPopup(endroit.nom);
  //   });
  // }

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
    this.router.navigate(['/component/update-endroit', id]);
  }

  deleteEndroit(id: number) {
    this.endroitService.deleteEndroit(id).subscribe(data => {
      console.log(data);
      this.getAllEndroit();
      const modalElement = document.getElementById('ST');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
      this.toastr.success('Endroit supprimée avec succès !', 'Succès');
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
  endroitDetails(id: number) {
    this.router.navigate(['/component/endroit-details', id]);
  }
  goToAddEndroitPage(): void {
    this.router.navigate(['/component/create-endroit']);
  }
}
