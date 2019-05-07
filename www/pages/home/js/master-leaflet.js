  // MAP
  var map = L.map('map').setView([51.505, -0.09], 13);
  // var marker = L.marker([51.5, -0.09]).addTo(map);
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    prefix:'',
    attribution: 'Geolink &copy;'
  }).addTo(map);

  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  // Set the title to show on the polygon button
  // L.drawLocal.draw.toolbar.buttons.polygon = 'Draw a sexy polygon!';

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
  map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
    layer = e.layer;

    // here you got the polygon points
    var latlngs = layer._latlngs[0];
    showPopup('popup_new_polygon',
      ()=>{
        polygon = new Polygon(0, $('#polygon_name').val(), $('#polygon_color').val(), latlngs);
        polygon.insertPolygon();
      },
      ()=>{
        closePopUp('opup_new_polygon');
      });
    drawnItems.addLayer(layer);
  });

  let a;

  map.on(L.Draw.Event.EDITED, function (e) {
    var layers = e.layers;
    for(let id in layers._layers){
      polygon = new Polygon(id, '', '', layers._layers[id]._latlngs);
      polygon.editPolygon();
    }
  });

  map.on(L.Draw.Event.DELETED, function (e) {
    var layers = e.layers;
    for(let id in layers._layers){
      polygon = new Polygon(id, '', '', []);
      polygon.deletePolygon();
    }
  });

  // L.DomUtil.get('changeColor').onclick = function () {
  //   drawControl.setDrawingOptions({rectangle: {shapeOptions: {color: '#004a80'}}});
  // };
