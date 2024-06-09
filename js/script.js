function togglePlayPause() {
    var audio1 = document.getElementById('audio1');
    var icon1 = document.getElementById('playPauseIcon1');
    if (audio1.paused) {
      audio1.play();
      icon1.classList.remove('fa-play');
      icon1.classList.add('fa-pause');
    } else {
      audio1.pause();
      icon1.classList.remove('fa-pause');
      icon1.classList.add('fa-play');
    }
}
