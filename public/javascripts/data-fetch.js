$(document).ready(function() {
  let temperatureInterval;
  let heartRateInterval;
  let locationInterval;
  let data;
  let currentIndex;

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
        if (!data) {
          fetchData();
        }
        temperatureInterval = setInterval(updateTemperature, 7000); // Update temperature every 7 seconds
        heartRateInterval = setInterval(updateHeartRate, 60000); // Update heart rate every 1 minute
        locationInterval = setInterval(updateLocation, 9000); // Update location every 9 seconds
      }
    }, randomTime / 10);
  });

  // Function to fetch data from the server
  function fetchData() {
    $.ajax({
      url: '/data.json',
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        data = response;
        // Randomly select an object from the array
        currentIndex = Math.floor(Math.random() * data.length);
        const randomObject = data[currentIndex];

        // Update the UI with the selected object's data
        $('#stats-container').show();
        updateTemperature();
        updateHeartRate();
        updateLocation(randomObject.latitude, randomObject.longitude);
      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  }

  // Function to update the temperature in the UI
  function updateTemperature() {
    if (data && data.length > 0) {
      const randomObject = data[currentIndex];
      $('#body_temperature').text(randomObject.body_temperature + "\u00B0" + "C");

      // Update temperature every 7 seconds
      setTimeout(updateTemperature, 7000);
    }
  }

  // Function to update the heart rate in the UI
  function updateHeartRate() {
    if (data && data.length > 0) {
      const randomObject = data[currentIndex];
      $('#heart_rate').text(randomObject.heart_rate + " BPM");

      // Update heart rate every 1 minute
      setTimeout(updateHeartRate, 60000);
    }
  }

  // Function to update the location in the UI
  function updateLocation() {
    if (data && data.length > 0) {
      currentIndex = Math.floor(Math.random() * data.length);
      const randomObject = data[currentIndex];
      const randomDeviationLat = (Math.random() * 0.00003) - 0.000015; // Random deviation between -0.000015 and 0.000015
      const randomDeviationLng = (Math.random() * 0.00003) - 0.000015; // Random deviation between -0.000015 and 0.000015
      const newLatitude = randomObject.latitude + randomDeviationLat;
      const newLongitude = randomObject.longitude + randomDeviationLng;

      $('#latitude').text(newLatitude.toFixed(6));
      $('#longitude').text(newLongitude.toFixed(6));

      // Update location every 9 seconds
      setTimeout(updateLocation, 9000);
    }
  }
});
