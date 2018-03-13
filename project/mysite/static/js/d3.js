
// --------for d3-----------
// The number of datapoints
var n_data = 100;
var svg, svgBubble;
var emotion_data, all_data;

var margin = {top: 10, right: 20, bottom: 20, left: 20}
, width = 500 - margin.left - margin.right // Use the window's width 
, height = 150 - margin.top - margin.bottom // Use the window's height
, height2 = 80 - margin.top - margin.bottom; // Use the window's height

// // 5. X scale will use the index of our data
// var xScale = d3.scaleLinear()
//     .domain([0, n_data-1]) // input
//     .range([0, width]); // output

var xScale;
// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
    .domain([0, 100]) // input 
    .range([height, 0]); // output 

// 7. d3's line generatorZ
var line = d3.line()
    .x(function(d, i) { return xScale(i*term/1000); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line 

function makeLineChart(postId){
  // 2. Use the margin convention practice 
  // var margin = {top: 10, right: 20, bottom: 10, left: 20}
  //   , width = 400 - margin.left - margin.right // Use the window's width 
  // height = 100 - margin.top - margin.bottom; // Use the window's height
  
  // var n_data = data.length;
  
  // 1. Add the SVG to the page and employ #2
  svg = d3.select("#d3Wrapper"+postId).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("style", 'display:none')      
      .attr("id", 'svg_l'+postId)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  // 3. Call the x axis in a group tag
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom
  
  // 4. Call the y axis in a group tag
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft
};

function drawPath(postId, data, emotionKind){
  var svg = d3.select('#svg_l'+postId+'>g');
  
  // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
  var all_data = data.map(d=> {
    if(d.attributes) return {y:d.attributes.emotion[emotionKind]};
    else return {y:0};
  });
  
  var color = {
    "sadness": "black",
    "neutral": "yellow",
    "disgust": "brown",
    "anger": "red",
    "surprise": "blue",
    "fear": "gray",
    "happiness": "green"
  };

  // 9. Append the path, bind the data, and call the line generator 
  svg.append("path")
      .datum(all_data) // 10. Binds data to the line 
      .attr("class", "line"+postId+" line") // Assign a class for styling 
      .attr("stroke", color[emotionKind]) // Assign a class for styling 
      .attr("d", line) // 11. Calls the line generator 
}

function drawDot(postId, data){
  // 12. Appends a circle for each datapoint 
  var svgBubble = d3.select('#svg_b'+postId+'>g');  
  
  emotion_data = data.map((d,i)=> {   
    if(d.attributes){
      // find maximum emotion
      var emotions = d.attributes.emotion;
      var values = Object.values(emotions);
      var maxValue = Math.max(...values);
      var emotionKind = Object.keys(emotions)[(values.indexOf(maxValue))];

      return {x:i*term/1000 , y:maxValue, kind:emotionKind};
    }
    else return {x:0, y:0, kind:'none'};
  });
  
  // 30% 이상이고 neutral아닌 감정만 필터링
  emotion_data = emotion_data.filter(d=> d.y > 30 && d.kind != 'neutral');
  
  var color = {
    "sadness": "black",
    "neutral": "yellow",
    "disgust": "brown",
    "anger": "red",
    "surprise": "blue",
    "fear": "gray",
    "happiness": "green"
  };

  svgBubble.selectAll(".dot")
    .remove();

  svgBubble.selectAll(".dot")  
      .data(emotion_data)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("fill", function(d) { return color[d.kind] }) // Assign a class for styling       
      .attr("cx", function(d, i) { return xScale(d.x) })
      // .attr("cy", function(d) { return yScale(d.y) })
      .attr("cy", height2/2)
      .attr("r", 0)
      .transition()
        .delay(300)
        .attr("r", function(d,i) { return d.y/10});
}

function makeBubbleChart(postId){

  // ----for emotion bubble 
  
  // 5. X scale will use the index of our data
  // var xScale = d3.scaleLinear()
  //     .domain([0, n_data-1]) // input
  //     .range([0, width]); // output
  
  
  // 1. Add the SVG to the page and employ #2
  svgBubble = d3.select("#d3Bubble"+postId).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height2 + margin.top + margin.bottom)
      .attr("id", "svg_b"+postId)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  svgBubble.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height2/2 + ")")
  .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom
}
