document.addEventListener('DOMContentLoaded', function() {
  function fetchDataAndUpdate() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          updateSensorReadings(xhr.responseText);
        }
      }
    };
    xhr.open('GET', '/data', true);
    xhr.send();
  }

  function updateSensorReadings(data) {
    var readings = data.split(',');
    var temperature = parseFloat(readings[0]);
    var pressure1 = parseFloat(readings[1]);
    var pressure2 = parseFloat(readings[2]);
    var pressure3 = parseFloat(readings[3]);

    // Update temperature reading
    document.getElementById('temperatureReading').textContent = temperature.toFixed(2) + '°C';

    // Update pressure readings
    document.getElementById('pressureReadings').innerHTML = ''; // Clear previous readings
    for (var i = 0; i < 3; i++) { // Assuming 3 pressure sensors
      var div = document.createElement('div');
      div.classList.add('sensor-reading');
      div.textContent = readings[i + 1].toFixed(2) + ' hg/mm'; // Adjust index to match your data
      document.getElementById('pressureReadings').appendChild(div);
    }
  }

  setInterval(fetchDataAndUpdate, 1000); // Fetch data every second
});
