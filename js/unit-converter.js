(function () {
  var UNITS = {
    length: { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 },
    weight: { mg: 0.000001, g: 0.001, kg: 1, oz: 0.0283495231, lb: 0.45359237, st: 6.35029318 },
    speed:  { 'mps': 1, 'kph': 1/3.6, 'mph': 0.44704, 'knot': 0.514444, 'fps': 0.3048 },
    volume: { ml: 0.001, l: 1, 'fl-oz': 0.0295735, cup: 0.236588, pt: 0.473176, qt: 0.946353, gal: 3.78541, 'cm3': 0.001, 'm3': 1000 },
    area:   { 'mm2': 1e-6, 'cm2': 1e-4, 'm2': 1, 'km2': 1e6, 'in2': 6.4516e-4, 'ft2': 0.092903, 'yd2': 0.836127, acre: 4046.86, ha: 10000, 'mi2': 2589988 },
    data:   { bit: 1, byte: 8, kb: 8e3, mb: 8e6, gb: 8e9, tb: 8e12, pb: 8e15, kib: 8192, mib: 8388608, gib: 8589934592, tib: 8796093022208 },
    time:   { ms: 0.001, s: 1, min: 60, h: 3600, day: 86400, week: 604800, month: 2629800, year: 31557600 }
  };

  var LABELS = {
    mm:'Millimeters', cm:'Centimeters', m:'Meters', km:'Kilometers',
    in:'Inches', ft:'Feet', yd:'Yards', mi:'Miles',
    mg:'Milligrams', g:'Grams', kg:'Kilograms', oz:'Ounces', lb:'Pounds', st:'Stone',
    mps:'m/s', kph:'km/h', mph:'mph', knot:'Knots', fps:'ft/s',
    ml:'Milliliters', l:'Liters', 'fl-oz':'Fl. Oz.', cup:'Cups', pt:'Pints', qt:'Quarts', gal:'Gallons', cm3:'cm³', m3:'m³',
    mm2:'mm²', cm2:'cm²', m2:'m²', km2:'km²', in2:'in²', ft2:'ft²', yd2:'yd²', acre:'Acres', ha:'Hectares', mi2:'mi²',
    bit:'Bits', byte:'Bytes', kb:'Kilobytes', mb:'Megabytes', gb:'Gigabytes', tb:'Terabytes', pb:'Petabytes',
    kib:'Kibibytes', mib:'Mebibytes', gib:'Gibibytes', tib:'Tebibytes',
    ms:'Milliseconds', s:'Seconds', min:'Minutes', h:'Hours', day:'Days', week:'Weeks', month:'Months', year:'Years',
    c:'Celsius', f:'Fahrenheit', k:'Kelvin'
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
      var opt = document.createElement('option');
      opt.value = key; opt.textContent = LABELS[key] || key;
      var opt2 = opt.cloneNode(true);
      fromSelect.appendChild(opt);
      toSelect.appendChild(opt2);
      if (i === 1) toSelect.value = key;
    });
  }

  function convertTemperature(value, from, to) {
    var c;
    if (from === 'c') c = value;
    else if (from === 'f') c = (value - 32) * 5 / 9;
    else c = value - 273.15;
    if (to === 'c') return c;
    if (to === 'f') return c * 9 / 5 + 32;
    return c + 273.15;
  }

  function convert() {
    var category = categorySelect.value;
    var value = parseFloat(input.value);
    var from = fromSelect.value;
    var to = toSelect.value;
    if (isNaN(value)) { result.textContent = 'Enter a valid number.'; return; }
    var output;
    if (category === 'temperature') {
      output = convertTemperature(value, from, to);
    } else {
      output = value * UNITS[category][from] / UNITS[category][to];
    }
    var formatted = output % 1 === 0 ? output : parseFloat(output.toPrecision(8));
    result.textContent = value + ' ' + (LABELS[from]||from) + ' = ' + formatted + ' ' + (LABELS[to]||to);
  }

  categorySelect.addEventListener('change', function () { populateUnits(categorySelect.value); });
  convertBtn.addEventListener('click', convert);
  input.addEventListener('keydown', function(e){ if(e.key==='Enter') convert(); });
  populateUnits('length');
})();
