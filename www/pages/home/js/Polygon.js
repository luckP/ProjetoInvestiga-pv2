class Polygon{
  constructor(id, name, color, latlngs){
    this.id = id;
    this.name = name;
    this.color = color;
    this.latlngs = (latlngs)=>{
      	let r = [latlngs[0]];
      	for(let i=1; i<latlngs.length; i++)
      		if( (latlngs[i].lat!=latlngs[i-1].lat) && (latlngs[i].lng!=latlngs[i-1].lng) ) r.push(latlngs[i])
      	return r;
      }
  }

  insertPolygon(){
    const url = URL+'InsertPoligon';

    $.ajax( {
      url:  url,
      type: "POST",
      data: {
        'name': this.name,
        'color': this.color,
        'latlngs': JSON.stringify(this.latlngs),
        'status': 1,
      }
    })
    .done((response) => {
      console.log(this.id);
    })
    .fail((error) => {
      alert( error );
    })
    .always(function() {
      closePopUp('popup_new_polygon');
    });
  }

  editPolygon(){
    const url = URL+'EditPolygon';
    console.log(this.latlngs);

    $.ajax( {
      url:  url,
      type: "POST",
      data: {
        'id': this.id,
        'latlngs': JSON.stringify( this.latlngs ),
      }
    })
    .done((response) => {
      console.log( 'ok' );
    })
    .fail(function() {
      alert( "error" );
    })
    .always(function() {

    });
  }

  deletePolygon(){
    const url = URL+'DeletePolygon';
    $.ajax( {
      url:  url,
      type: "POST",
      data: {
        'id': this.id,
      }
    })
    .done((response) => {
      console.log( response );
    })
    .fail(function() {
      alert( "error" );
    })
    .always(function() {

    });
  }

  loadPolygonOnMap(){
    let poly = L.polygon( this.latlngs, {color: this.color} );
    poly._leaflet_id = this.id;
    drawnItems.addLayer(poly);
  }
}
