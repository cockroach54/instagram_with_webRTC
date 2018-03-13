
c1 = document.getElementById('c1');
ctx1 = c1.getContext('2d');
video = document.getElementById('gum');

function postFace(imgURL, callback){
  var imgURL2 = imgURL.replace(/data:image\/(png|jpeg);base64,/, '');
  $.ajax({
    url: "https://api-us.faceplusplus.com/facepp/v3/detect",
    type: 'post',
    data: {
      api_key: 'f4dC33D49hMuXV64I8Z9Gjy06ssiD58z',
      api_secret: 'IJBK0dgs-VC2TTTWjNwMIVxqNLxu1bjC',
      image_base64: imgURL2,
      // image_url: 'http://cfile3.uf.tistory.com/image/9968D23359B362212076BF',
      return_attributes: 'gender,age,emotion',
    },
    success: function (data) {
      console.log('face++ api call success!!!');
      callback(data['faces']);
    }
  });
}

function postFace_(imgURL) {
  var imgURL2 = imgURL.replace(/data:image\/(png|jpeg);base64,/, '');  
  var httpRequst;
  if (window.XMLHttpRequest) httpRequest = new XMLHttpRequest();
  else if (window.ActiveXObject) httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  var url = "https://api-us.faceplusplus.com/facepp/v3/detect";
  var headers = {
    // 'Accept': 'application/json',
  };
  var params = {
    api_key: 'f4dC33D49hMuXV64I8Z9Gjy06ssiD58z',
    api_secret: 'IJBK0dgs-VC2TTTWjNwMIVxqNLxu1bjC',
    image_base64: imgURL2,
    // image_url: 'http://cfile3.uf.tistory.com/image/9968D23359B362212076BF',        
    return_attributes: 'gender,age,emotion',
  };

  return new Promise((resolve, reject) => {
    httpRequest.open('POST', url, true);
    for (key in headers) {
      httpRequest.setRequestHeader(key, headers[key]);
    }
    httpRequest.send(JSON.stringify(params));

    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) { //이건 클라이언트꺼 서버것 아님
          var res = httpRequest.responseText;
          res = JSON.parse(res);
          resolve(res);
        }
        else {
          console.error('server has errors.');
          reject();
        }
      }
    };
  });
}

// ----------여기부터 실용코드---------
var captures = document.getElementById('captures');
var interval = 2500; // ms
var intervalId;
var data_emotion = {};
var emotions = ["sadness","neutral","anger","surprise","happiness"];
// var emotions = ["sadness","neutral","disgust","anger","surprise","fear","happiness"];

function makeCaptures(postId, ms){
  intervalId = setInterval(function(){
    var newImg = document.createElement('img');
    ctx1.drawImage(video, 0, 0, 120, 90);
    var imgURL = c1.toDataURL('image/png', 1);
    newImg.src = imgURL;
  
    captures.appendChild(newImg);

    if(!data_emotion[postId]) data_emotion[postId]=[];
    // api call
    postFace(imgURL, res=>{
      console.log(res);
      data_emotion[postId].push(res[0]? res[0]: {});
    });

    d3.selectAll('path.line'+postId).remove();
    emotions.forEach(function(el, id){
      drawPath(postId, data_emotion[postId], el);
    });
    drawDot(postId, data_emotion[postId]);

  }, ms);
}

function makeCaptures_test(postId, ms){
  intervalId = setInterval(function(){
    if(!data_emotion[postId]) data_emotion[postId]=[];    
    data_emotion[postId].push(
      {
        "attributes": {
          "emotion": {
            "sadness": 10,
            "neutral": 48,
            // "disgust": 0.117,
            "anger": 5,
            "surprise": 7,
            // "fear": 0.003,
            "happiness": 30
          },
          "gender": {
            "value": "Male"
          },
          "age": {
            "value": 25
          }
        },
        "face_rectangle": {
          "width": 41,
          "top": 42,
          "left": 46,
          "height": 41
        },
        "face_token": "c5837c7a18997e6715691863b250b788"
      },
    );

    d3.selectAll('path.line'+postId).remove();
    emotions.forEach(function(el, id){
      drawPath(postId, data_emotion[postId], el);
    });
    drawDot(postId, data_emotion[postId]);

  }, ms);
}

function stopCapture(){
  clearInterval(intervalId);
  console.log('Capture stopped...');
}


