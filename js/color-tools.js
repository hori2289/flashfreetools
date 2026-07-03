(function () {
  var picker = document.getElementById('ct-picker');
  var hexIn = document.getElementById('ct-hex');
  var swatch = document.getElementById('ct-swatch');
  var outHex = document.getElementById('ct-out-hex');
  var outRgb = document.getElementById('ct-out-rgb');
  var outHsl = document.getElementById('ct-out-hsl');
  var outCss = document.getElementById('ct-out-css');

  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map(function(c){ return c+c; }).join('');
    if (hex.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(hex)) return null;
    return { r: parseInt(hex.slice(0,2),16), g: parseInt(hex.slice(2,4),16), b: parseInt(hex.slice(4,6),16) };
  }

  function rgbToHsl(r, g, b) {
    r/=255; g/=255; b/=255;
    var max=Math.max(r,g,b), min=Math.min(r,g,b), h, s, l=(max+min)/2;
    if (max===min) { h=s=0; } else {
      var d=max-min; s=l>0.5?d/(2-max-min):d/(max+min);
      switch(max){ case r:h=((g-b)/d+(g<b?6:0))/6;break; case g:h=((b-r)/d+2)/6;break; default:h=((r-g)/d+4)/6; }
    }
    return { h:Math.round(h*360), s:Math.round(s*100), l:Math.round(l*100) };
  }

  function display(hex) {
    var rgb = hexToRgb(hex);
    if (!rgb) return;
    var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    var full = '#'+hex.replace(/^#/,'');
    swatch.style.background = full;
    outHex.textContent = full.toUpperCase();
    outRgb.textContent = 'rgb('+rgb.r+', '+rgb.g+', '+rgb.b+')';
    outHsl.textContent = 'hsl('+hsl.h+', '+hsl.s+'%, '+hsl.l+'%)';
    outCss.textContent = '--color: '+full.toUpperCase()+';';
    picker.value = full;
    // contrast suggestion
    var lum = 0.2126*(rgb.r/255)+0.7152*(rgb.g/255)+0.0722*(rgb.b/255);
    document.getElementById('ct-contrast').textContent = lum > 0.4 ? 'Use dark text on this background' : 'Use light text on this background';
  }

  picker.addEventListener('input', function(){ display(picker.value); hexIn.value = picker.value.replace('#','').toUpperCase(); });

  document.getElementById('ct-convert').addEventListener('click', function(){
    display(hexIn.value.trim());
  });
  hexIn.addEventListener('keydown', function(e){ if(e.key==='Enter') display(hexIn.value.trim()); });

  function makeCopy(elId, btnId) {
    document.getElementById(btnId).addEventListener('click', function(){
      var text = document.getElementById(elId).textContent;
      navigator.clipboard.writeText(text).then(function(){
        var btn = document.getElementById(btnId);
        btn.textContent = 'Copied!';
        setTimeout(function(){ btn.textContent = 'Copy'; }, 1500);
      });
    });
  }
  makeCopy('ct-out-hex','ct-copy-hex');
  makeCopy('ct-out-rgb','ct-copy-rgb');
  makeCopy('ct-out-hsl','ct-copy-hsl');

  display('#2563eb');
})();
