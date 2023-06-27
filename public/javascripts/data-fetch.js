$('#data-container').hide();

function fetchData() {
  $.ajax({
    url: "https://engineering-final-project.onrender.com/api/fetch",
    method: "GET",
    dataType: "JSON",
    success: function (response) {
      console.log(response);

      $('#button').html('Get Health Data');
      $('#temperature-val').html(response['temperature'] + " \u00B0" + "C");
      $('#heart-rate-val').html(response['heartrate'] + " BPM");
      $('#humidity-val').html(response['humidity'] + " %");
      $('#latitude-val').html(response['lat']);
      $('#longitude-val').html(response['lng']);

      $('#data-container').show();
    }
  });
}

$('#button').on('click', function (e) {
  e.preventDefault();

  $('#data-container').hide();
  $('#button').html("Fetching data...");

  fetchData(); // Initial fetch

  setInterval(fetchData, 5000); // Fetch data every 20 seconds
});
