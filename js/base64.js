(function () {
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabPanes = document.querySelectorAll('.tab-pane');
  tabBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      tabBtns.forEach(function(b){ b.classList.remove('active'); });
      tabPanes.forEach(function(p){ p.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  // Encode
  document.getElementById('b64-encode-btn').addEventListener('click', function(){
    var text = document.getElementById('b64-input').value;
    try {
      document.getElementById('b64-encode-result').textContent = btoa(unescape(encodeURIComponent(text)));
    } catch(e) { document.getElementById('b64-encode-result').textContent = 'Error: ' + e.message; }
  });

  // Decode
  document.getElementById('b64-decode-btn').addEventListener('click', function(){
    var text = document.getElementById('b64-decode-input').value.trim();
    try {
      document.getElementById('b64-decode-result').textContent = decodeURIComponent(escape(atob(text)));
    } catch(e) { document.getElementById('b64-decode-result').textContent = 'Invalid Base64 input.'; }
  });

  function makeCopy(inputId, btnId, resultId) {
    document.getElementById(btnId).addEventListener('click', function(){
      var text = document.getElementById(resultId).textContent;
      navigator.clipboard.writeText(text).then(function(){
        var btn = document.getElementById(btnId);
        var orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function(){ btn.textContent = orig; }, 1500);
      });
    });
  }
  makeCopy(null, 'b64-copy-encode', 'b64-encode-result');
  makeCopy(null, 'b64-copy-decode', 'b64-decode-result');
})();
