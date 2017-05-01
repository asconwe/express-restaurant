$( document ).ready(function () {
  
  var getTablesUrl = '/api/tables';
  $.get(getTablesUrl, function (data) {
    console.log(data);
    var tables = JSON.parse(data);
    tables.forEach(function (table) {
      $('#tables-content').append('<h3>' + table.name + '</h3>');
      $('#tables-content').append('<p>Email: ' + table.email + ', Tel: ' + table.number + '</p>');
    });

  });
  var getWaitingUrl = '/api/waiting';
  console.log('hey');
  $.get(getWaitingUrl, function (data) {

  });
});