$(document).ready(function() {
  let temperatureInterval;
  let heartRateInterval;
  let locationInterval;

  $('#button').click(function() {
    // Save the original button text
    const originalButtonText = $('#button').text();

    // Show the progress bar and update the button text
    $('#progress-bar-container').show();
    $('#button').text('Fetching Data');

    // Generate a random time between 3 and 5 seconds (in milliseconds)
    const randomTime = Math.floor(Math.random() * 2000) + 3000;

    // Simulate progress
    let progress = 0;
    let interval = setInterval(function() {
      progress += 10;
      $('#progress-bar').width(progress + '%');

      // Once progress reaches 100%, hide the progress bar, restore the button text, and fetch data
      if (progress >= 100) {
        clearInterval(interval);
        $('#progress-bar-container').hide();
        $('#button').text(originalButtonText);
        fetchData();
        temperatureInterval = setInterval(updateTemperature, 20000); // Update temperature every 20 seconds
        heartRateInterval = setInterval(updateHeartRate, 60000); // Update heart rate every 1 minute
        locationInterval = setInterval(updateLocation, 15000); // Update location every 15 seconds
      }
    }, randomTime / 10);
  });

  // Function to fetch data from the server and update the UI
  function fetchData() {
    $.ajax({
      url: '/data.json',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        // Randomly select an object from the array
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomObject = data[randomIndex];

        // Update the UI with the selected object's data
        $('#stats-container').show();
        updateTemperature(randomObject.body_temperature);
        updateHeartRate(randomObject.heart_rate);
        updateLocation(randomObject.latitude, randomObject.longitude);
      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  }

  // Function to update the temperature in the UI
  function updateTemperature(temperature) {
    $('#body_temperature').text(temperature + "\u00B0" + "C");

    // Update temperature every 20 seconds
    temperatureInterval = setTimeout(updateTemperature, 20000, temperature);
  }

  // Function to update the heart rate in the UI
  function updateHeartRate(heartRate) {
    $('#heart_rate').text(heartRate + "BPM");

    // Update heart rate every 1 minute
    heartRateInterval = setTimeout(updateHeartRate, 60000, heartRate);
  }

  // Function to update the location in the UI
  function updateLocation(latitude, longitude) {
    const randomDeviation = (Math.random() * 2 - 1) / 10000; // Random deviation between -0.0002 and 0.0002
    const newLatitude = latitude + randomDeviation;
    const newLongitude = longitude + randomDeviation;

    $('#latitude').text(newLatitude.toFixed(6));
    $('#longitude').text(newLongitude.toFixed(6));

    // Update location every 15 seconds
    locationInterval = setTimeout(updateLocation, 15000, newLatitude, newLongitude);
  }
});
