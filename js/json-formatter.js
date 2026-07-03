(function () {
  var input = document.getElementById('jf-input');
  var output = document.getElementById('json-output');
  var statusEl = document.getElementById('jf-status');

  document.getElementById('jf-format').addEventListener('click', function(){
    try {
      var parsed = JSON.parse(input.value);
      output.textContent = JSON.stringify(parsed, null, 2);
      statusEl.textContent = '✓ Valid JSON';
      statusEl.style.color = '#16a34a';
    } catch(e) {
      output.textContent = '';
      statusEl.textContent = '✗ ' + e.message;
      statusEl.style.color = '#dc2626';
    }
  });

  document.getElementById('jf-minify').addEventListener('click', function(){
    try {
      var parsed = JSON.parse(input.value);
      output.textContent = JSON.stringify(parsed);
      statusEl.textContent = '✓ Minified';
      statusEl.style.color = '#16a34a';
    } catch(e) {
      statusEl.textContent = '✗ ' + e.message;
      statusEl.style.color = '#dc2626';
    }
  });

  document.getElementById('jf-validate').addEventListener('click', function(){
    try {
      var parsed = JSON.parse(input.value);
      var keys = JSON.stringify(parsed).match(/"/g);
      statusEl.textContent = '✓ Valid JSON — ' + (keys ? keys.length/2 : 0) + ' keys/values';
      statusEl.style.color = '#16a34a';
    } catch(e) {
      statusEl.textContent = '✗ Invalid: ' + e.message;
      statusEl.style.color = '#dc2626';
    }
  });

  document.getElementById('jf-clear').addEventListener('click', function(){ input.value=''; output.textContent=''; statusEl.textContent=''; });
  document.getElementById('jf-copy').addEventListener('click', function(){
    var text = output.textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(function(){
      var btn = document.getElementById('jf-copy');
      btn.textContent='Copied!';
      setTimeout(function(){ btn.textContent='Copy Output'; }, 1500);
    });
  });
})();
