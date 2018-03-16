var players = document.querySelectorAll('.videoPlayer');
players = Array.prototype.slice.call(players);

// 모든 포스트에 적용
players.forEach((el, id)=>{

var postId = el.getAttribute('id').split('Player')[1]*1;

var videoPlayer = document.getElementById('videoPlayer'+postId);
var playBtn = document.getElementById('playBtn'+postId);
var optionBtn = document.getElementById('optionBtn'+postId);
var bar = document.getElementById('bar'+postId);
var showAllBtn = document.getElementById('showAll'+postId);

playBtn.addEventListener('click', function(){
  if(videoPlayer.paused){
    videoPlayer.play();
    playBtn.innerText = '||';

    if(!document.querySelector('#svg_b'+postId)){
      console.log('play without emotion capture...');
    }
    else{
      // 여기에 face++ 시작코드 필요
      console.log('video played...');
      console.log('term:', term, 'ms');
  
      // face++ api call term setting
      makeCaptures(postId, term);
      // makeCaptures_test(postId, term);
    }
  }
  else{
    videoPlayer.pause();
    playBtn.innerText ='>';
  }
});

optionBtn.addEventListener('click', function(){
  // d3차트 만들기  
  if(!document.querySelector('#svg_b'+postId)){    
    term = videoPlayer.duration / ratio * 1000 ; // ms 보정
    n_data = ratio;

    xScale = d3.scaleLinear()
      .domain([0, +videoPlayer.duration.toFixed(0)]) // input
      // .domain([0, n_data-1]) // input
      .range([0, width]); // output

    makeBubbleChart(postId);
    // makeLineChart(postId); //현재 미사용

    var svg_b = document.querySelector('#svg_b'+postId);
    svg_b.style.display = 'initial';
    showAllBtn.style.display = 'initial';

    // 댓글 데이터 받아오기
    var emotions = document.querySelectorAll('.emotion.p'+postId);
    emotions = Array.prototype.slice.call(emotions);
    comment_emotion[postId] = [];
    emotions.map(d=>{
      comment_emotion[postId].push(...JSON.parse(d.innerText));
      comment_emotion[postId].sort((a,b)=> a.x - b.x);
    });
    console.log('emotion data:\n', comment_emotion[postId]);
    
    return;
  }

  var svg_b = document.querySelector('#svg_b'+postId);  
  if(svg_b.style.display == 'none'){
    svg_b.style.display = 'initial';
    showAllBtn.style.display = 'initial';
  }    
  else{
    svg_b.style.display = 'none';
    showAllBtn.style.display = 'none';
  }    
});

showAllBtn.addEventListener('click', function(){
  drawDot(postId, comment_emotion[postId]);   
});

videoPlayer.addEventListener('play', function(){

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