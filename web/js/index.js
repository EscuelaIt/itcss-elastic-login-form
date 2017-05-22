/* Simple VanillaJS to toggle class */

document.getElementById('toggleProfile').addEventListener('click', function () {
  [].map.call(document.querySelectorAll('.c-profile'), function(el) {
    el.classList.toggle('c-profile--open');
  });
});
