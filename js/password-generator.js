(function () {
  var lengthInput = document.getElementById('pw-length');
  var lengthVal = document.getElementById('pw-length-val');
  var upper = document.getElementById('pw-upper');
  var lower = document.getElementById('pw-lower');
  var numbers = document.getElementById('pw-numbers');
  var symbols = document.getElementById('pw-symbols');
  var result = document.getElementById('pw-result');
  var generateBtn = document.getElementById('pw-generate');
  var copyBtn = document.getElementById('pw-copy');

  var SETS = {
    upper: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
    lower: 'abcdefghijkmnpqrstuvwxyz',
    numbers: '23456789',
    symbols: '!@#$%^&*()-_=+[]{}'
  };

  lengthInput.addEventListener('input', function () {
    lengthVal.textContent = lengthInput.value;
  });

  function generate() {
    var pool = '';
    if (upper.checked) pool += SETS.upper;
    if (lower.checked) pool += SETS.lower;
    if (numbers.checked) pool += SETS.numbers;
    if (symbols.checked) pool += SETS.symbols;
    if (!pool) { result.textContent = 'Select at least one character type.'; return; }

    var length = parseInt(lengthInput.value, 10);
    var array = new Uint32Array(length);
    crypto.getRandomValues(array);
    var password = '';
    for (var i = 0; i < length; i++) {
      password += pool[array[i] % pool.length];
    }
    result.textContent = password;
  }

  generateBtn.addEventListener('click', generate);
  copyBtn.addEventListener('click', function () {
    var text = result.textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(function () {
      copyBtn.textContent = 'Copied!';
      setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1500);
    });
  });

  generate();
})();
