
  $('#btn_login').click(function(){
    let url = URL+'Login';
    showLoad();
    
    $.ajax( {
      url:  url,
      type: "POST",
      data: {
        'user_name': $('#popup_email').val(),
        'user_pass': $('#popup_password').val(),
      }
    })
    .done((response) => {
        alert( response );
    })
    .fail(function() {
        alert( "error" );
    })
    .always(function() {
      hideLoad();
    });

  });

  $('#popup_register_confirm').click(function(){
    let url = URL+'Register';
    showLoad();

    $.ajax( {
      url:  url,
      type: "POST",
      data: {
          'user_name': $('#register_name').val(),
          'user_email': $('#register_email').val(),
          'user_password': $('#register_password').val(),
          }
    })
    .done(() => {
        // alert( "success" );
    })
    .fail(function() {
        alert( "error" );
    })
    .always(function() {
      hideLoad();
      // alert( "complete" );
    });
  });
