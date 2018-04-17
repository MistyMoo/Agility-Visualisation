d3.csv("jump_loc.csv")
        .row(function(d) {
          return{
            jump:+d.Jump ,
            x: +d.X ,
            y: +d.Y,
            dog: d.Dog,
            handler: d.handler,
            country: d.Country,
            breed: d.breed,
            fault: d.Fault};})

          .get(function(error, data){

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var jumpTip = 0;
var svg = d3.select("body").append("svg")
          .attr("height","600")
          .attr("width","1150");

var img = svg.selectAll("image").data([0]);

img.enter().append("svg:image")
          .attr("href","file:///C:/Users/Allison/Documents/GitHub/Agility-Visualisation/image_for_viz.jpg")
          .attr("x","-100")
          .attr("y","60")
          .attr("width","1150")
          .attr("height","500");

svg.selectAll("circle")
  .data(data)
  .enter().append("circle")
  .attr("cx", function(d, i) {return d.x})
  .attr("cy", function(d, i) {return d.y})
    .attr("r", 10)
    .on("mouseover", onMouseOver)
    .on("mouseout", function(d) {
      jumpTip=0;
      div.transition().duration(600).style("opacity", 0)});

var jumps = svg.selectAll("text")
    .data(data)
    .enter().append("text")
    .attr("x", function(d,i) {return d.x;})
    .attr("y", function(d,i) {return d.y;})
    .attr("font-size","15")
    .attr("fill","black")
    .attr("dy", ".35em")
    .attr("text-anchor","middle")
    .text(function(d,i) {return d.jump;})
    .on("mouseover", onMouseOver)
    .on("mouseout", function(d) {
    jumpTip=0;
    div.transition().duration(600).style("opacity", 0)});

var groupId = [];
for (var i = 0; i< data.length; i++){
  var item = data[i];
  if (!groupId[item.jump]){
    groupId[item.jump] = [];}
    groupId[item.jump].push({jump: item.jump, dog: item.dog, handler: item.handler, fault: item.fault});
  }

function onMouseOver(d) {
              div.transition()
                  .duration(200)
                  .style("opacity", .9)
              console.log("d.jump: "+d.jump)
              if(d.dog != "None"){
                jumpTip = d.jump
                if(groupId[jumpTip].length == 3){
                    div.html("Dog: "+groupId[jumpTip][0].dog+"</br>"+
                              "Handler: "+groupId[jumpTip][0].handler+ "</br>"+
                              "Fault: "+groupId[jumpTip][0].fault+ "</br>"+
                              ""+ "</br>"+
                              "Dog: "+groupId[jumpTip][1].dog+"</br>"+
                              "Handler: "+groupId[jumpTip][1].handler+ "</br>"+
                              "Fault: "+groupId[jumpTip][1].fault+ "</br>"+
                              ""+ "</br>"+
                              "Dog: "+groupId[jumpTip][2].dog+"</br>"+
                              "Handler: "+groupId[jumpTip][2].handler+ "</br>"+
                              "Fault: "+groupId[jumpTip][2].fault)
                        .style("left", d3.event.pageX + "px")
                        .style("top", (d3.event.pageY - 150) + "px");
                }

                else if(groupId[jumpTip].length == 2){
                      div.html("Dog: "+groupId[jumpTip][0].dog+"</br>"+
                                "Handler: "+groupId[jumpTip][0].handler+ "</br>"+
                                "Fault: "+groupId[jumpTip][0].fault+ "</br>"+
                                " "+ "</br>"+
                                "Dog: "+groupId[jumpTip][1].dog+"</br>"+
                                "Handler: "+groupId[jumpTip][1].handler+ "</br>"+
                                "Fault: "+groupId[jumpTip][1].fault)
                          .style("left", d3.event.pageX + "px")
                          .style("top", (d3.event.pageY - 28) + "px");
                  }
                  else if(groupId[jumpTip].length == 1){
                      div.html("Dog: "+groupId[jumpTip][0].dog+"</br>"+
                                "Handler: "+groupId[jumpTip][0].handler+ "</br>"+
                                "Fault: "+groupId[jumpTip][0].fault)
                          .style("left", d3.event.pageX + "px")
                          .style("top", (d3.event.pageY - 28) + "px");
                  }}
              else{div.html("No faults")
              .style("width", 150)
              .style("height",50)
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
                }

           }
      }
)
