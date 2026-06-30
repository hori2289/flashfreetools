(function () {
  var UNITS = {
    length: {
      mm: 0.001, cm: 0.01, m: 1, km: 1000,
      in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344
    },
    weight: {
      mg: 0.000001, g: 0.001, kg: 1,
      oz: 0.0283495231, lb: 0.45359237, st: 6.35029318
    }
  };

  var LABELS = {
    mm: 'Millimeters', cm: 'Centimeters', m: 'Meters', km: 'Kilometers',
    in: 'Inches', ft: 'Feet', yd: 'Yards', mi: 'Miles',
    mg: 'Milligrams', g: 'Grams', kg: 'Kilograms',
    oz: 'Ounces', lb: 'Pounds', st: 'Stone',
    c: 'Celsius', f: 'Fahrenheit', k: 'Kelvin'
  };

  var categorySelect = document.getElementById('uc-category');
  var fromSelect = document.getElementById('uc-from');
  var toSelect = document.getElementById('uc-to');
  var input = document.getElementById('uc-input');
  var result = document.getElementById('uc-result');
  var convertBtn = document.getElementById('uc-convert');

  function populateUnits(category) {
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';
    var keys = category === 'temperature' ? ['c', 'f', 'k'] : Object.keys(UNITS[category]);
    keys.forEach(function (key, i) {
      var opt1 = document.createElement('option');
      opt1.value = key; opt1.textContent = LABELS[key];
      var opt2 = opt1.cloneNode(true);
      fromSelect.appendChild(opt1);
      toSelect.appendChild(opt2);
      if (i === 1) toSelect.value = key;
    });
  }

  function convertTemperature(value, from, to) {
    var celsius;
    if (from === 'c') celsius = value;
    else if (from === 'f') celsius = (value - 32) * 5 / 9;
    else celsius = value - 273.15;

    if (to === 'c') return celsius;
    if (to === 'f') return celsius * 9 / 5 + 32;
    return celsius + 273.15;
  }

  function convert() {
    var category = categorySelect.value;
    var value = parseFloat(input.value);
    var from = fromSelect.value;
    var to = toSelect.value;
    if (isNaN(value)) {
      result.textContent = 'Enter a valid number.';
      return;
    }
    var output;
    if (category === 'temperature') {
      output = convertTemperature(value, from, to);
    } else {
      var meters = value * UNITS[category][from];
      output = meters / UNITS[category][to];
    }
    result.textContent = value + ' ' + LABELS[from] + ' = ' + (Math.round(output * 100000) / 100000) + ' ' + LABELS[to];
  }

  categorySelect.addEventListener('change', function () {
    populateUnits(categorySelect.value);
  });
  convertBtn.addEventListener('click', convert);

  populateUnits('length');
})();
