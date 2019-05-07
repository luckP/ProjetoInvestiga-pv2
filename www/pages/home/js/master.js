  let polygons_list = [];

  $('#btn_edit_polygon').click(()=>{
    showPopup('popup_new_polygon');
  });

  $('#polygon_color_text').click(function(){
    $('#polygon_color').click();
  });

  $('#polygon_color').change(function() {
    $('#polygon_color_text').val($(this).val());
  });

  $('.popup-close').click(function(){
    closePopUp($(this).parent().attr('id'));
  });

  function showPopup(popupId, funcConfirm, funcCancel){
    let speed = 300;
    const popup = $('#'+popupId)
    popup.css('display', 'block');

    popup.find('.popup-main').animate({
      'marginTop': '100px',
      'opacity': '1'
    }, speed);

    popup.find('.btn-confirm').click(function() {
      funcConfirm();
    });

    popup.find('.btn-cancel').click(function() {
      funcCancel();
    });
  }

  function closePopUp(popup_id){
    let speed = 300;
    const popup = $('#'+popup_id);

    popup.find('.popup-main').animate({
      'marginTop': '-100px',
      'opacity': '0'
    }, speed, ()=>{
      popup.css('display', 'none');
    });

    popup.find('.btn-confirm').off('click');
    popup.find('.btn-cancel').off('click');

    $('#'+popup_id).find('input').val('');
  }






































  /*

  L.DrawToolbar = L.Toolbar.extend({

  statics: {
  TYPE: 'draw'
  },

  options: {
  polyline: {},
  polygon: {},
  rectangle: {},
  circle: {},
  marker: {},
  circlemarker: {}
  },

  // @method initialize(): void
  initialize: function (options) {
  // Ensure that the options are merged correctly since L.extend is only shallow
  for (var type in this.options) {
  if (this.options.hasOwnProperty(type)) {
  if (options[type]) {
  options[type] = L.extend({}, this.options[type], options[type]);
  }
  }
  }

  this._toolbarClass = 'leaflet-draw-draw';
  L.Toolbar.prototype.initialize.call(this, options);
  },

  // @method getModeHandlers(): object
  // Get mode handlers information
  getModeHandlers: function (map) {
  return [
  {
  enabled: this.options.polyline,
  handler: new L.Draw.Polyline(map, this.options.polyline),
  title: L.drawLocal.draw.toolbar.buttons.polyline
  },
  {
  enabled: this.options.polygon,
  handler: new L.Draw.Polygon(map, this.options.polygon),
  title: L.drawLocal.draw.toolbar.buttons.polygon
  },
  {
  enabled: this.options.rectangle,
  handler: new L.Draw.Rectangle(map, this.options.rectangle),
  title: L.drawLocal.draw.toolbar.buttons.rectangle
  },
  {
  enabled: this.options.circle,
  handler: new L.Draw.Circle(map, this.options.circle),
  title: L.drawLocal.draw.toolbar.buttons.circle
  },
  {
  enabled: this.options.marker,
  handler: new L.Draw.Marker(map, this.options.marker),
  title: L.drawLocal.draw.toolbar.buttons.marker
  },
  {
  enabled: this.options.circlemarker,
  handler: new L.Draw.CircleMarker(map, this.options.circlemarker),
  title: L.drawLocal.draw.toolbar.buttons.circlemarker
  }
  ];
  },

  // @method getActions(): object
  // Get action information
  getActions: function (handler) {
  return [
  {
  enabled: handler.completeShape,
  title: L.drawLocal.draw.toolbar.finish.title,
  text: L.drawLocal.draw.toolbar.finish.text,
  callback: handler.completeShape,
  context: handler
  },
  {
  enabled: handler.deleteLastVertex,
  title: L.drawLocal.draw.toolbar.undo.title,
  text: L.drawLocal.draw.toolbar.undo.text,
  callback: handler.deleteLastVertex,
  context: handler
  },
  {
  title: L.drawLocal.draw.toolbar.actions.title,
  text: L.drawLocal.draw.toolbar.actions.text,
  callback: this.disable,
  context: this
  }
  ];
  },

  // @method setOptions(): void
  // Sets the options to the toolbar
  setOptions: function (options) {
  L.setOptions(this, options);

  for (var type in this._modes) {
  if (this._modes.hasOwnProperty(type) && options.hasOwnProperty(type)) {
  this._modes[type].handler.setOptions(options[type]);
  }
  }
  }
  });






  */



















  $('#left_menu').click(function(){
    const referent_size = 250;
    const speed = 300;
    const size = ($('.left-sidebar').width() == 0)? referent_size:0; // if size == 0 then close left-sidebar
    console.log(size);

    $('.left-sidebar').animate({'width': size}, speed);
    $('nav').animate({'width': $('nav').width()+referent_size-2*size}, speed);
    $('.main').animate({'width': $('.main').width()+referent_size-2*size}, speed);


    if(size == 0)
    $(this).find('i').removeClass( "fa-times")
    .addClass( "fa-bars" );
    else
    $(this).find('i').removeClass( "fa-bars")
    .addClass( "fa-times" );
  });

  $('.nav-config-option').click(function(){
    const referent_size = 250;
    const size = ($('.right-sidebar').width()==0)? referent_size: 0;
    const speed = 300;
    $('.right-sidebar').animate({'width': size}, speed);
  });



  // initialize the map on the "map" div with a given center and zoom
  // var map = L.map('map', {
  //     center: [51.505, -0.09],
  //     zoom: 13
  // });
