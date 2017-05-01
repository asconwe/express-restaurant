$( document ).ready(function () {
  
  var postUrl = '/api/new';
  $('#submit-reservation').submit(function (e) {
    console.log('hey');
    $.post(postUrl, {
      name: $('#res-name').val(),
      email: $('#res-email').val(),
      number: $('#res-number').val()
    }, function () {
      alert('Your spot is reserved');
    });
    e.preventDefault();
  });
})