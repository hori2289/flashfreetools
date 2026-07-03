(function () {
  var SETS = { upper:'ABCDEFGHJKLMNPQRSTUVWXYZ', lower:'abcdefghijkmnpqrstuvwxyz', numbers:'23456789', symbols:'!@#$%^&*()-_=+[]{}' };
  var WORDS = ['apple','bridge','cloud','dance','eagle','flame','grape','house','ivory','jewel','kite','lemon','mango','noble','ocean','piano','queen','river','stone','tiger','umbra','valor','water','xenon','yacht','zebra','amber','brave','crane','drift','ember','frost','giant','haven','inset','joker','karma','lunar','maple','night','olive','pearl','quest','radar','solar','trail','ultra','vivid','woven','pixel','quota','rapid','swift','torch','urban','venom','witch','xerox','yield','zonal','acorn','blaze','crisp','delta','elbow','faint','glide','homer','input','judge','kneel','lance','mercy','nexus','oaken','proxy','quirk','rebel','shard','tower','unify','viper','waltz','expat','youth','zesty','abyss','bloom','comet','drape','epoch','ferry','guide','haste','ideal','joust','knack','light','match','nerve','onyx','plain','quote','reign','spine','trove','unite','verse','weave','extra','yonder','zinnia'];

  // ---- TAB SWITCHING ----
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

  // ---- RANDOM PASSWORD ----
  var lengthInput = document.getElementById('pw-length');
  var lengthVal = document.getElementById('pw-length-val');
  var upper = document.getElementById('pw-upper');
  var lower = document.getElementById('pw-lower');
  var numbers = document.getElementById('pw-numbers');
  var symbols = document.getElementById('pw-symbols');
  var result = document.getElementById('pw-result');
  var copyBtn = document.getElementById('pw-copy');

  lengthInput.addEventListener('input', function(){ lengthVal.textContent = lengthInput.value; });

  function generateRandom() {
    var pool = '';
    if (upper.checked) pool += SETS.upper;
    if (lower.checked) pool += SETS.lower;
    if (numbers.checked) pool += SETS.numbers;
    if (symbols.checked) pool += SETS.symbols;
    if (!pool) { result.textContent = 'Select at least one character type.'; return; }
    var length = parseInt(lengthInput.value, 10);
    var arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    var pw = '';
    for (var i = 0; i < length; i++) pw += pool[arr[i] % pool.length];
    result.textContent = pw;
    showStrength(pw, result);
  }

  document.getElementById('pw-generate').addEventListener('click', generateRandom);

  // ---- PASSPHRASE ----
  var wordCount = document.getElementById('pp-word-count');
  var wordCountVal = document.getElementById('pp-word-count-val');
  var ppSep = document.getElementById('pp-sep');
  var ppCapitalize = document.getElementById('pp-capitalize');
  var ppAddNumber = document.getElementById('pp-add-number');
  var ppResult = document.getElementById('pp-result');
  var ppPills = document.getElementById('pp-pills');

  wordCount.addEventListener('input', function(){ wordCountVal.textContent = wordCount.value; });

  function generatePassphrase() {
    var count = parseInt(wordCount.value, 10);
    var sep = ppSep.value;
    var arr = new Uint32Array(count);
    crypto.getRandomValues(arr);
    var chosen = Array.from(arr).map(function(n){ return WORDS[n % WORDS.length]; });
    if (ppCapitalize.checked) chosen = chosen.map(function(w){ return w[0].toUpperCase()+w.slice(1); });
    if (ppAddNumber.checked) {
      var numArr = new Uint32Array(1);
      crypto.getRandomValues(numArr);
      chosen.push(String(numArr[0] % 100));
    }
    var phrase = chosen.join(sep === 'dash' ? '-' : sep === 'dot' ? '.' : sep === 'space' ? ' ' : '_');
    ppResult.textContent = phrase;
    ppPills.innerHTML = chosen.map(function(w){ return '<span class="word-pill">'+w+'</span>'; }).join('');
  }

  document.getElementById('pp-generate').addEventListener('click', generatePassphrase);

  // ---- CUSTOM WORDS ----
  var cwInput = document.getElementById('cw-input');
  var cwLeet = document.getElementById('cw-leet');
  var cwNumbers = document.getElementById('cw-numbers');
  var cwSymbols = document.getElementById('cw-symbols');
  var cwShuffle = document.getElementById('cw-shuffle');
  var cwResult = document.getElementById('cw-result');

  var LEET = { a:'@', e:'3', i:'!', o:'0', s:'$', t:'7', l:'1', g:'9', b:'8' };

  function customBuild() {
    var words = cwInput.value.trim().split(/[\s,]+/).filter(Boolean);
    if (!words.length) { cwResult.textContent = 'Enter at least one word.'; return; }
    if (cwShuffle.checked) { words = words.sort(function(){ return Math.random()-0.5; }); }
    var combined = words.join('');
    if (cwLeet.checked) combined = combined.split('').map(function(c){ return LEET[c.toLowerCase()] || c; }).join('');
    if (cwNumbers.checked) { var n=new Uint32Array(1); crypto.getRandomValues(n); combined += String(n[0]%1000).padStart(3,'0'); }
    if (cwSymbols.checked) { var syms='!@#$%^&*'; var s=new Uint32Array(1); crypto.getRandomValues(s); combined += syms[s[0]%syms.length]; }
    cwResult.textContent = combined;
    showStrength(combined, cwResult);
  }

  document.getElementById('cw-generate').addEventListener('click', customBuild);

  // ---- SHARED COPY ----
  function makeCopiable(resultEl, btn) {
    btn.addEventListener('click', function(){
      var t = resultEl.textContent;
      if (!t) return;
      navigator.clipboard.writeText(t).then(function(){ btn.textContent='Copied!'; setTimeout(function(){ btn.textContent='Copy'; }, 1500); });
    });
  }
  makeCopiable(result, copyBtn);
  makeCopiable(ppResult, document.getElementById('pp-copy'));
  makeCopiable(cwResult, document.getElementById('cw-copy'));

  // ---- STRENGTH METER ----
  function showStrength(pw, el) {
    var score = 0;
    if (pw.length >= 8)  score++;
    if (pw.length >= 12) score++;
    if (pw.length >= 16) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    var label = score <= 2 ? 'Weak 🔴' : score <= 4 ? 'Fair 🟡' : 'Strong 🟢';
    var hint = document.getElementById('pw-strength') || document.createElement('div');
    hint.id = 'pw-strength';
    hint.style.cssText = 'margin-top:0.4rem;font-size:0.9rem;font-weight:600;';
    hint.textContent = 'Strength: ' + label;
    if (!document.getElementById('pw-strength')) el.parentNode.insertBefore(hint, el.nextSibling);
  }

  generateRandom();
})();
