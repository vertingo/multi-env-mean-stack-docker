import { Restaurant } from './../../../../models/restaurant';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { RestaurantsService } from 'src/app/services/restaurants.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  constructor(private restaurantsService: RestaurantsService) {}
 
  // Fonction d'initialisation du composant.
  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const macarte = L.map('frugalmap').setView([48.85513, 2.353429], 9);
   
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'FatBoar',
    }).addTo(macarte);
   
    const myIcon = L.icon({
      // iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
      iconUrl: "../assets/img/marker/markericon.png"
      
    });
   
   
    this.restaurantsService.getRestaurants().subscribe((data: any) => {
      data.forEach( (res : Restaurant ) => {
        var marker = L.marker([res.latitude, res.longitude], {icon: myIcon}).addTo(macarte);

        marker.bindPopup(`<h5 style="text-align: center"><b>${res.name}</b></h5>  <b> adresse : </b>${res.adress}`,
        { maxWidth: 130 , minWidth:120}
        );
      });
    });
   
  }
  }
