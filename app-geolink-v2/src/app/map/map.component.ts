import { Component, OnInit } from '@angular/core';
declare var L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private mymap

  constructor() { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap():void{
    this.mymap = L.map('mapid').setView([51.505, -0.09], 13);
  }

}
