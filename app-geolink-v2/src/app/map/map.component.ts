import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavBarService } from '../nav-bar-service.service';
import { MatDialog } from '@angular/material';
import { MapAddPolygonDialogComponent } from './map-add-polygon-dialog/map-add-polygon-dialog.component';
import { MapEditPolygonDialogComponent } from './map-edit-polygon-dialog/map-edit-polygon-dialog.component';
import { MapDeletePolygonDialogComponent } from './map-delete-polygon-dialog/map-delete-polygon-dialog.component';
import { MapService } from './map.service';
declare var L: any;
declare var $:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  private map:any;
  private squares:any = new L.FeatureGroup();

  constructor(
    private auth: AuthService, 
    public nav: NavBarService,
    public dialog: MatDialog,
    private mapService: MapService,
    ) { }

  ngOnInit() {
    this.loadMap();
    this.auth.checkLoged();
  }

  loadMap(): void {
    // MAP
    this.map = L.map('map').setView([41.1579, -8.6291], 13);
    // var marker = L.marker([51.5, -0.09]).addTo(map);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      prefix: '',
      attribution: 'Geolink &copy;'
    }).addTo(this.map);

    this.map.addLayer(this.squares);

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
      featureGroup: this.squares,
      remove: true
    }
  });

  this.map.addControl(drawControl);
  this.loadSquares();

  this.map.on(L.Draw.Event.CREATED, (e:any) => {
    const layer = e.layer;
    // this.squares.addLayer(layer);
    this.openAddDialog(layer._latlngs[0]);
  });


  this.map.on(L.Draw.Event.EDITED,(e:any) => {
  //   var layers = e.layers;
  //   for(let id in layers._layers){
  //     polygon = new Polygon(id, '', '', layers._layers[id]._latlngs);
  //     polygon.editPolygon();
  //   }

    this.openEditDialog();
  });

  this.map.on(L.Draw.Event.DELETED, (e:any) => {
  //   var layers = e.layers;
  //   for(let id in layers._layers){
  //     polygon = new Polygon(id, '', '', []);
  //     polygon.deletePolygon();
  //   }
    this.openDeleteDialog();
  });
}

loadSquares(){
  this.mapService.loadSquare({})
    .subscribe(
      resp => {this.drawSquares(resp)},
      err  => {console.error(err);}
    );
}

drawSquares(squares: any){
  for(let s in squares){
      L.polygon(squares[s]['coors'], {
        color: squares[s]['color'],
        fillColor: squares[s]['color'],
        fillOpacity: 0.5})
      .addTo(this.squares);
  }
}

// dialogs
openAddDialog(_layer): void {
  const dialogRef = this.dialog.open(MapAddPolygonDialogComponent, {
    width: '450px',
    data: {layer: _layer}
  });

  dialogRef.afterClosed().subscribe(result => {
    this.drawSquares(result)
  });
}

openEditDialog(): void {
  const dialogRef = this.dialog.open(MapEditPolygonDialogComponent, {
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

openDeleteDialog(): void {
  const dialogRef = this.dialog.open(MapDeletePolygonDialogComponent, {
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

navOpenClose(){
  setTimeout(()=>{ this.map.invalidateSize()}, 100);
  this.nav.openCloseSideBar();
}

}
