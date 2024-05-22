import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { EndroitService } from 'src/app/services/endroit.service';
import { District } from 'src/app/models/district';
import { DistrictService } from 'src/app/services/district.service';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html'
})
export class TopSellingComponent implements OnInit {

  private map!: L.Map;
  private centroid: L.LatLngExpression = [27.137, -13.145];
  endroits: any[] = [];
  districts: District[] = [];
  categories: Categorie[] = [];
  districtsL: any[] = [];
  selectedDistrictId: number | null = null;
  selectedAnnexeId: number | null = null;
  selectedCategorieId: number | null = null;
  selectedAnnexes: any[] = [];
  private markersLayer: L.LayerGroup;
  isAdmin: boolean = false;

  constructor(private authService: UserAuthService, private categorieservice: CategorieService, private endroitService: EndroitService, private router: Router, private districtService: DistrictService) {
    this.markersLayer = L.layerGroup();
  }

  ngOnInit(): void {
    this.checkAdminRole();
    if (this.isAdmin) {
      this.initMap();
      this.getAllEndroit();
      this.getAllDistricts();
      this.getAllCategorie();
    }
  }

  private checkAdminRole() {
    this.isAdmin = this.authService.getRole() === 'Admin';
  }

  private getAllCategorie() {
    this.categorieservice.getAllCategorie().subscribe(data => {
      this.categories = data;
    });
  }

  getAllEndroit() {
    this.endroitService.getAllEndroit().subscribe(data => {
      console.log('All endroits:', data); // Debugging statement
      this.endroits = data;
      this.refreshMarkers();
    });
  }

  getAllDistricts(): void {
    this.districtService.getAllDistrict().subscribe(
      (data: District[]) => {
        console.log('All districts:', data); // Debugging statement
        this.districts = data;
        this.districtsL = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des districts : ', error);
      }
    );
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });

    const tiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    this.markersLayer.addTo(this.map);
  }

  private refreshMarkers(): void {
    console.log('Refreshing markers with filtered endroits:', this.filteredEndroits()); // Debugging statement
    this.markersLayer.clearLayers();

    const customIcon = L.icon({
      iconUrl: '../../../../assets/images/icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -41]
    });

    this.filteredEndroits().forEach(endroit => {
      const marker = L.marker([endroit.latitude, endroit.longitude], { icon: customIcon });
      marker.bindPopup(endroit.nom);
      this.markersLayer.addLayer(marker);
    });
  }

  private filteredEndroits(): any[] {
    const districtId = this.selectedDistrictId ? Number(this.selectedDistrictId) : null;
    const annexeId = this.selectedAnnexeId ? Number(this.selectedAnnexeId) : null;
    const categorieId = this.selectedCategorieId ? Number(this.selectedCategorieId) : null;

    console.log('Filtering by districtId:', districtId); // Debugging statement
    console.log('Filtering by annexeId:', annexeId); // Debugging statement
    console.log('Filtering by categorieId:', categorieId); // Debugging statement

    return this.endroits.filter(endroit => {
      const matchesDistrict = districtId === null || (endroit.district && endroit.district.id === districtId);
      const matchesAnnexe = annexeId === null || (endroit.annexe && endroit.annexe.id === annexeId);
      const matchesCategorie = categorieId === null || (endroit.categorie && endroit.categorie.id === categorieId);
      return matchesDistrict && matchesAnnexe && matchesCategorie;
    });
  }

  onDistrictChange(): void {
    console.log('Selected district ID:', this.selectedDistrictId); // Debugging statement
    if (this.selectedDistrictId !== null) {
      const districtId = Number(this.selectedDistrictId);
      const selectedDistrict = this.districtsL.find(d => d.id === districtId);
      console.log('Selected district:', selectedDistrict); // Debugging statement
      this.selectedAnnexes = selectedDistrict ? selectedDistrict.annexes || [] : [];
    } else {
      this.selectedAnnexes = [];
    }
    this.selectedAnnexeId = null;
    this.refreshMarkers();
  }

  onAnnexeChange(): void {
    console.log('Selected annexe ID:', this.selectedAnnexeId); // Debugging statement
    this.refreshMarkers();
  }

  onCategorieChange(): void {
    console.log('Selected categorie ID:', this.selectedCategorieId); // Debugging statement
    this.refreshMarkers();
  }
}
