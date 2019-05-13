import { Component, OnInit } from '@angular/core';
declare var L: any;
declare var $:any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map:any;

  constructor() { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap(): void {
    // MAP
    this.map = L.map('map').setView([51.505, -0.09], 13);
    // var marker = L.marker([51.5, -0.09]).addTo(map);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      prefix: '',
      attribution: 'Geolink &copy;'
    }).addTo(this.map);

    var drawnItems = new L.FeatureGroup();
    this.map.addLayer(drawnItems);

  var drawControl = new L.Control.Draw({
    position: 'topright',
    draw: {
      polyline: false,
      polygon: {},
      rectangle: true,
      circle: false,
      marker: false
    },
    edit: {
      featureGroup: drawnItems,
      remove: true
    }
  });
  this.map.addControl(drawControl);

  this.map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
    layer = e.layer;

    // here you got the polygon points
    var latlngs = layer._latlngs[0];
    // showPopup('popup_new_polygon',
    //   ()=>{
    //     polygon = new Polygon(0, $('#polygon_name').val(), $('#polygon_color').val(), latlngs);
    //     polygon.insertPolygon();
    //   },
    //   ()=>{
    //     closePopUp('opup_new_polygon');
    //   });
    drawnItems.addLayer(layer);
  });


  // this.map.on(L.Draw.Event.EDITED, function (e) {
  //   var layers = e.layers;
  //   for(let id in layers._layers){
  //     polygon = new Polygon(id, '', '', layers._layers[id]._latlngs);
  //     polygon.editPolygon();
  //   }
  // });

  // this.map.on(L.Draw.Event.DELETED, function (e) {
  //   var layers = e.layers;
  //   for(let id in layers._layers){
  //     polygon = new Polygon(id, '', '', []);
  //     polygon.deletePolygon();
  //   }
  // });
}

}
