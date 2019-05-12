import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';

// declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
        maxZoom: 25,
        attribution: 'Geolink &copy;'
        }),
    ],
    zoom: 13,
    center: latLng(41.158108 ,  -8.629121)
  }

  constructor() { }
  

  ngOnInit() {
      
  }

}
