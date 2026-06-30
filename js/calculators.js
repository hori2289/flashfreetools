(function () {
  // BMI
  document.getElementById('bmi-calc').addEventListener('click', function () {
    var weight = parseFloat(document.getElementById('bmi-weight').value);
    var height = parseFloat(document.getElementById('bmi-height').value) / 100;
    var resultEl = document.getElementById('bmi-result');
    if (!weight || !height) { resultEl.textContent = 'Enter valid weight and height.'; return; }
    var bmi = weight / (height * height);
    var category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : 'Obese';
    resultEl.textContent = 'BMI: ' + bmi.toFixed(1) + ' (' + category + ')';
  });

  // Percentage
  document.getElementById('pct-calc').addEventListener('click', function () {
    var value = parseFloat(document.getElementById('pct-value').value);
    var total = parseFloat(document.getElementById('pct-total').value);
    var resultEl = document.getElementById('pct-result');
    if (!total) { resultEl.textContent = 'Enter a non-zero total.'; return; }
    resultEl.textContent = value + ' is ' + ((value / total) * 100).toFixed(2) + '% of ' + total;
  });

  // Age
  document.getElementById('age-calc').addEventListener('click', function () {
    var dobStr = document.getElementById('age-dob').value;
    var resultEl = document.getElementById('age-result');
    var dob = new Date(dobStr);
    if (isNaN(dob.getTime())) { resultEl.textContent = 'Enter a valid date as YYYY-MM-DD.'; return; }
    var now = new Date();
    var years = now.getFullYear() - dob.getFullYear();
    var months = now.getMonth() - dob.getMonth();
    var days = now.getDate() - dob.getDate();
    if (days < 0) { months -= 1; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years -= 1; months += 12; }
    resultEl.textContent = 'Age: ' + years + ' years, ' + months + ' months, ' + days + ' days';
  });
})();
