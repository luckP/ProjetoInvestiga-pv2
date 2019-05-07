$('.dropdown').mouseover(function(event) {
  // $(this).find('.dropdown-content').css('display': 'block');
  let size = $(this).find('ul').find("li").length*40;
  $(this).find('ul').css({'height': size+"px", 'opacity': '1'});
}).mouseleave(function(event) {
  $(this).find('ul').css({'height': '', 'opacity': '0'});
});



function showPopup(popupId){
  let time = 300;
  $('#'+popupId).css('display', 'block');
  $('#'+popupId).animate({'opacity': '1'}, time);

  $('#'+popupId).find('.popup-main').animate({
    'marginTop': '100px',
    'opacity': '1'
  }, time);
}

function showLoad(){
  $('#loading').show();
  $('#loading').animate({opacity: 1}, 300);
}

function hideLoad(){
  $('#loading').animate({opacity: 0}, 300, function(){
    $('#loading').hide();
  });
}

$(function(){
  for(let div of $('.popup-footer'))
    $(div).children('.popup-button').css('width', 100/$(div).children('.popup-button').length + '%');
  $('.popup-foote').children('.popup-button').first().css('.popup-button', 'none');
});

$('#menu_login').click(()=>{
  showPopup('popup_login')
});

$('.popup-close').click(function(){
  let time = 300;
  let popup = $(this).parent();
  popup.animate({'opacity': '0'}, time);

  popup.find('.popup-main').animate({
    'marginTop': '-100px',
    'opacity': '0'
  }, time, ()=>{
    popup.css('display', 'none');
  });
});

$('.popup_password_view').click(function(){
  let input = $(this).parent().find('input').first();
  if(input.attr('type') == 'password'){
    input.attr('type', 'text');
    $(this).animate({'opacity': 1}, 300);
  }
  else{
    input.attr('type', 'password');
    $(this).animate({'opacity': .4}, 300);
  }
});

$('.forgot-password').mouseover(function(event) {
  $(this).find('div').animate({'width': '100%', 'marginLeft': '0'}, 300);
}).mouseleave(function(event) {
  $(this).find('div').animate({'width': '0', 'marginLeft': '50%'}, 300);
});

$('#menu_register').click(()=>{
  showPopup('popup_register')
});

$('#conta-button').click(function(){
  $('conta-button').css("color", "red");
  $("#conta").show();
  var elmnt = document.getElementById("conta");
  elmnt.scrollIntoView();
});

$('#viatura-button').click(function(){
  $("#viaturas").show();
});

$('#edit-conta-button').click(function(){
  $("#edit-conta").show();
});

$('#edit-vi-button').click(function(){
  $("#edit-viatura").show();
});
