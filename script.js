document.addEventListener('DOMContentLoaded', function() {
  // Function to update sensor readings
  function updateSensorReadings(data) {
    document.getElementById('pressureReadings').innerHTML = '<div class="sensor-reading">' + data.pressure1 + ' hg/mm</div><div class="sensor-reading">' + data.pressure2 + ' hg/mm</div><div class="sensor-reading">' + data.pressure3 + ' hg/mm</div>';
    document.getElementById('temperatureReading').innerHTML = '<div class="sensor-reading">' + data.temperature + '°C</div>';
    document.getElementById('angularOrientation').innerHTML = '<div class="sensor-reading">' + data.angularOrientation + '°</div>';
  }

  // Simulate receiving data from ESP8266 (replace with actual code to receive data from ESP8266)
  var receivedData = {
    temperature: 25.0,
    pressure1: 1013.25,
    pressure2: 1013.25,
    pressure3: 1013.25,
    angularOrientation: 0
  };

  // Update sensor readings with received data
  updateSensorReadings(receivedData);

  // BMI calculator functionality (remains unchanged)
  const bmiForm = document.getElementById('bmiForm');
  const bmiResult = document.getElementById('bmiResult');

  bmiForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const bmi = calculateBMI(height, weight);
    displayBMIResult(bmi);
  });

  function calculateBMI(height, weight) {
    return weight / ((height / 100) ** 2);
  }

  function displayBMIResult(bmi) {
    let message = '';
    let resultClass = '';

    if (bmi < 18.5) {
      message = 'Your BMI is ' + bmi.toFixed(2) + ', indicating you are underweight.';
    } else if (bmi >= 18.5 && bmi < 25) {
      message = 'Your BMI is ' + bmi.toFixed(2) + ', indicating you are at a healthy weight.';
      resultClass = 'good';
    } else if (bmi >= 25 && bmi < 30) {
      message = 'Your BMI is ' + bmi.toFixed(2) + ', indicating you are overweight.';
      resultClass = 'overweight';
    } else {
      message = 'Your BMI is ' + bmi.toFixed(2) + ', indicating you are obese.';
      resultClass = 'obese';
    }
    
    bmiResult.textContent = message;
    bmiResult.className = ''; // Reset classes
    bmiResult.classList.add(resultClass); // Add appropriate class
  }
});
