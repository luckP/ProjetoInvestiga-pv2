function loadAllMapPolygons(){
  var url = URL+'loadAllMapPolygons';

  $.ajax( {
    url:  url,
    type: "POST",
    data: {}
  })
  .done((response) => {
    polygons_list = [];
    let polys = response.response_polygons;
    let polys_cords = response.response_polygons_coordinates;
    let polys_cords_array = [];
    for( let i in polys_cords )
      polys_cords_array.push({'id_polygon': polys_cords[i].id_polygon, 'lat': polys_cords[i].lat, 'lng': polys_cords[i].lng });

    for( let i in polys ){
      console.log(polys[i].id);
      let poluygon = new Polygon( polys[i].id, polys[i].name, polys[i].color, polys_cords_array.filter(pc => pc.id_polygon == polys[i].id));
      // polygons_list[polygons_list.length-1].id = polys[i].id;
      poluygon.loadPolygonOnMap();
    }
  })
  .fail((error) => {
    alert( error );
  })
  .always(function() {
  });
}

loadAllMapPolygons();
