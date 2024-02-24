document.addEventListener('DOMContentLoaded', function() {
  const bmiForm = document.getElementById('bmiForm');
  const bmiResult = document.getElementById('bmiResult');
  const sensorReadings = document.getElementById('sensorReadings');

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

  const ws = new WebSocket('ws://192.168.254.60'); 
  
  ws.onopen = function() {
    console.log('WebSocket connected');
  };
  
  ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    displaySensorReadings(data);
  };
  
  function displaySensorReadings(data) {
    let html = '';
    for (const key in data) {
      html += `<div class="sensor-reading">${key}: ${data[key]}</div>`;
    }
    sensorReadings.innerHTML = html;
  }
});
