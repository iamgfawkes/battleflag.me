(function($) {

  function renderPreview(blob, name) {
    var fileReader = new FileReader()
    fileReader.onload = function(e) {
      var canvas   = $('#preview')[0]
        , canvas2  = $('<canvas >')[0]
        , under  = canvas.getContext('2d')
        , over   = canvas2.getContext('2d')
        , srcImg  = new Image()
        , flagImg = new Image();

      srcImg.src = e.target.result;
      srcImg.onload = function() {
        under.drawImage(srcImg, 0, 0);
      };

      canvas.width = canvas2.width = srcImg.width;
      canvas.height = canvas2.height = srcImg.height;

      flagImg.src = 'img/battleflag.png';
      flagImg.onload = function() {
        console.log("loaded flag image");

        over.imageSmoothingEnabled = true;
        over.drawImage(flagImg, 0, 0, srcImg.width, srcImg.height);

        over.blendOnto(under, 'screen');
      }
    }

    fileReader.readAsDataURL(blob);
  }

  $('input[type=file]').on('change', function(ev) {
      var file = ev.currentTarget.files[0]

      renderPreview(file, file.name);

      $('#preview-row').show();

      $('html, body').stop().animate({
        scrollTop: $('#preview').offset().top
      }, 1500, 'easeInOutExpo');
  });

  $('.file-inputs').bootstrapFileInput();
})(jQuery);