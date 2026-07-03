(function () {
  var input = document.getElementById('tu-input');
  var stats = document.getElementById('tu-stats');

  function wordCount(text) { return text.trim() ? text.trim().split(/\s+/).length : 0; }
  function readingTime(words) {
    var mins = Math.ceil(words / 200);
    return mins <= 1 ? 'about 1 min read' : 'about ' + mins + ' min read';
  }

  function updateStats() {
    var text = input.value;
    var words = wordCount(text);
    var chars = text.length;
    var charsNoSpace = text.replace(/\s/g,'').length;
    var sentences = (text.match(/[.!?]+/g) || []).length;
    var paragraphs = text.trim() ? text.split(/\n{2,}/).filter(function(p){ return p.trim(); }).length : 0;
    stats.innerHTML =
      '<strong>' + words + '</strong> words &nbsp;|&nbsp; ' +
      '<strong>' + chars + '</strong> characters &nbsp;|&nbsp; ' +
      '<strong>' + charsNoSpace + '</strong> chars (no spaces) &nbsp;|&nbsp; ' +
      '<strong>' + sentences + '</strong> sentences &nbsp;|&nbsp; ' +
      '<strong>' + paragraphs + '</strong> paragraphs &nbsp;|&nbsp; ' +
      '<strong>' + readingTime(words) + '</strong>';
  }

  input.addEventListener('input', updateStats);

  // Case transformers
  document.getElementById('tu-upper').addEventListener('click', function(){ input.value = input.value.toUpperCase(); updateStats(); });
  document.getElementById('tu-lower').addEventListener('click', function(){ input.value = input.value.toLowerCase(); updateStats(); });
  document.getElementById('tu-title').addEventListener('click', function(){
    input.value = input.value.replace(/\w\S*/g, function(t){ return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase(); });
    updateStats();
  });
  document.getElementById('tu-sentence').addEventListener('click', function(){
    input.value = input.value.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, function(c){ return c.toUpperCase(); });
    updateStats();
  });
  document.getElementById('tu-trim').addEventListener('click', function(){ input.value = input.value.replace(/\s+/g,' ').trim(); updateStats(); });
  document.getElementById('tu-reverse').addEventListener('click', function(){ input.value = input.value.split('').reverse().join(''); updateStats(); });
  document.getElementById('tu-remove-dupes').addEventListener('click', function(){
    var lines = input.value.split('\n');
    var seen = {};
    input.value = lines.filter(function(l){ var k=l.trim(); if(seen[k]) return false; seen[k]=true; return true; }).join('\n');
    updateStats();
  });

  // Character frequency
  document.getElementById('tu-freq').addEventListener('click', function(){
    var text = input.value.replace(/\s/g,'');
    if (!text) { document.getElementById('tu-freq-output').innerHTML = ''; return; }
    var freq = {};
    text.split('').forEach(function(c){ freq[c] = (freq[c]||0)+1; });
    var sorted = Object.entries(freq).sort(function(a,b){ return b[1]-a[1]; }).slice(0,20);
    var max = sorted[0][1];
    var rows = sorted.map(function(e){
      var pct = Math.round(e[1]/max*100);
      return '<tr><td>'+e[0]+'</td><td>'+e[1]+'</td><td><span class="freq-bar" style="width:'+pct+'px"></span></td></tr>';
    }).join('');
    document.getElementById('tu-freq-output').innerHTML = '<table class="freq-table"><thead><tr><th>Char</th><th>Count</th><th>Frequency</th></tr></thead><tbody>'+rows+'</tbody></table>';
  });

  // Copy result
  document.getElementById('tu-copy').addEventListener('click', function(){
    navigator.clipboard.writeText(input.value).then(function(){
      var btn = document.getElementById('tu-copy');
      btn.textContent = 'Copied!';
      setTimeout(function(){ btn.textContent = 'Copy Text'; }, 1500);
    });
  });

  updateStats();
})();
