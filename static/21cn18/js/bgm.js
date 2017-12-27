$(function() {
  var audio = $('audio')[0]
  function togglePlay() {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }
})