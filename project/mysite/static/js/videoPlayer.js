var players = document.querySelectorAll('.videoPlayer');
players = Array.prototype.slice.call(players);

players.forEach((el, id)=>{

var postId = el.getAttribute('id').split('Player')[1]*1;

var videoPlayer = document.getElementById('videoPlayer'+postId);
var playBtn = document.getElementById('playBtn'+postId);
var optionBtn = document.getElementById('optionBtn'+postId);
var bar = document.getElementById('bar'+postId);

playBtn.addEventListener('click', function(){
  if(videoPlayer.paused){
    videoPlayer.play();
    playBtn.innerText = '||';
  }
  else{
    videoPlayer.pause();
    playBtn.innerText ='>';
  }
});

optionBtn.addEventListener('click', function(){
  var svg_l = document.querySelector('#svg_l'+postId);
  if(svg_l.style.display == 'none') svg_l.style.display = 'initial';
  else svg_l.style.display = 'none';
});

videoPlayer.addEventListener('play', function(){
  // 여기에 face++ 시작코드 필요
  console.log('video played...');

  // face++ api call term setting
  term = videoPlayer.duration / ratio * 1000 ; // ms 보정
  n_data = ratio;

  xScale = d3.scaleLinear()
    .domain([0, +videoPlayer.duration.toFixed(0)]) // input
    // .domain([0, n_data-1]) // input
    .range([0, width]); // output

  if(!document.querySelector('#svg_l'+postId)){
    makeBubbleChart(postId);
    makeLineChart(postId);
  }
  makeCaptures(postId, term);
  // makeCaptures_test(postId, term);

  console.log('term:', term, 'ms');
});

videoPlayer.addEventListener("pause", function(){
  stopCapture();
});

videoPlayer.addEventListener('timeupdate', function(){
  var curTime = videoPlayer.currentTime / videoPlayer.duration * ratio;
  bar.innerText = `${curTime.toFixed(1)}/${ratio}`;
});



});

var term; // api call 시간간격
var ratio = 100; // 총 데이터포인트 = n_data (d3)