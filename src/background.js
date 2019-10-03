import { bodyParser } from "restify";

var joy ={
    "color_1" : "#009b00",
    "color_2" : "#00d800" 
};
var anger = {
    "color_1" : "#b40100",
    "color_2" : "#ef0100"
};
var fear ={
    "color_1" : "#780100",
    "color_2" : "#b40100"
};
var sadness = {
    "color_1" : "#666464",
    "color_2" : "#898989"
};
var confident = {
    "color_1" : "#9E61D9",
    "color_2" : "#D2AFF4"
};
document.body.style.backgroundColor = "linear-gradient(to right," + joy.color_1 + "," + joy.color_2 + ")";
window.addEventListener("load",function() { changeBackground("linear-gradient(to right," + joy.color_1 + "," + joy.color_2 + ");") })
/*
var feelings = [joy,anger,fear, sadness, confident];
function setGradient( feeling ){
    var colorPicked;
    for(var i = 0; i < feelings.size(); i ++){
        if(feelings == feeling){
            colorPicked = feelings[i];
            break;
        }
    }
    body.style.background = "linear-gradient(to right," + colorPicked.color_1 + "," + colorPicked.color_2 + ")";
   // css.textContent = body.style.background;
}
*/
