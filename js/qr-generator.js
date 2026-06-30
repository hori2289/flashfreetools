(function () {
  var textInput = document.getElementById('qr-text');
  var generateBtn = document.getElementById('qr-generate');
  var downloadBtn = document.getElementById('qr-download');
  var output = document.getElementById('qr-output');
  var qr = null;

  generateBtn.addEventListener('click', function () {
    var text = textInput.value.trim();
    if (!text) return;
    output.innerHTML = '';
    qr = new QRCode(output, {
      text: text,
      width: 220,
      height: 220
    });
    downloadBtn.style.display = 'inline-block';
  });

  downloadBtn.addEventListener('click', function () {
    var img = output.querySelector('img');
    var canvas = output.querySelector('canvas');
    var src = img ? img.src : (canvas ? canvas.toDataURL('image/png') : null);
    if (!src) return;
    var a = document.createElement('a');
    a.href = src;
    a.download = 'qr-code.png';
    a.click();
  });
})();
