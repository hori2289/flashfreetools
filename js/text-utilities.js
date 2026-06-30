(function () {
  var input = document.getElementById('tu-input');
  var stats = document.getElementById('tu-stats');

  function updateStats() {
    var text = input.value;
    var words = text.trim() ? text.trim().split(/\s+/).length : 0;
    var chars = text.length;
    var sentences = (text.match(/[.!?]+/g) || []).length;
    stats.textContent = words + ' words, ' + chars + ' characters, ' + sentences + ' sentences';
  }

  input.addEventListener('input', updateStats);

  document.getElementById('tu-upper').addEventListener('click', function () {
    input.value = input.value.toUpperCase();
    updateStats();
  });
  document.getElementById('tu-lower').addEventListener('click', function () {
    input.value = input.value.toLowerCase();
    updateStats();
  });
  document.getElementById('tu-title').addEventListener('click', function () {
    input.value = input.value.replace(/\w\S*/g, function (t) {
      return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
    });
    updateStats();
  });
  document.getElementById('tu-trim').addEventListener('click', function () {
    input.value = input.value.replace(/\s+/g, ' ').trim();
    updateStats();
  });

  updateStats();
})();
