var i=0;
var SOUNDS = {};
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

     var request2 = new XMLHttpRequest();
     request2.open('GET', 'meow.ogg')
     request2.responseType = 'arraybuffer'
     request2.onload = function() {
         audioContext.decodeAudioData(request2.response, function(buffer) {
             SOUNDS['meow'] = buffer;
         }, function(msg) {console.error(msg)});
      }
      request2.send();
 
 
 function meow(pitch) {
    var s = SOUNDS["meow"]
    var source = audioContext.createBufferSource()
    source.buffer = s
    source.connect(audioContext.destination);
    source.playbackRate.value = pitch;
    source.start(0);
}
 