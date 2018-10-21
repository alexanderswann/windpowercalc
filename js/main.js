// var weather;
// function setup() {
//   loadJSON('https://api.openweathermap.org/data/2.5/weather?id=4196508&APPID=d877a4ead94677246082ffd6ec22cb8a&units=metric', gotData);
// }
//
// function gotData(data) {
//   weather = data;
// }
//
// function draw(){
// 	if(weather){
// 	var T=weather.main.temp;
// 	var RH = weather.main.humidity;
//   var p = weather.main.pressure;
// 	var Rd = 287.058;
//   var Rv = 461.495;
//   var a = 17.62;
//   var b = 243.12;
//   var md = 0.028964;
//   var mv = 0.018016;
//   var r = 8.314;
//   var Ts = (b * (Math.log(RH / 100) + a * T / (b + T))) / (a - (Math.log(RH / 100) + a * T / (b + T)));
//   var p1 = (6.1078 * (Math.pow(10, ((7.5 * Ts) / (Ts + 237.3)))));
//   var pv = p1 * (.01 * RH)
//   var pd = p - pv;
//   var pp = ((pd * 100) / (Rd * (T + 273.15))) + ((pv * 100) / (Rv * (T + 273.15)));
//   var ρ = ((100 * pd * md) + (100 * pv * mv)) / ((T + 273.15) * r);
//   ρ = ρ.toFixed(4);
//   var output = document.getElementById('density');
//   output.innerHTML = 'youngbratz';
// 	}
// }
var weather;

var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&APPID=d877a4ead94677246082ffd6ec22cb8a';
var units = '&units=metric';
var s;
var input;
function setup() {
  createCanvas (400,200);

	var button = select('#submit');
	button.mousePressed(weatherAsk);

	input = select('#city');

}

function weatherAsk(){
	var url = api+input.value()+apiKey+units;
  loadJSON(url, gotData);
}

function gotData(data) {
  weather = data;
}

function draw(){
  background(0);
	if(weather){
	var temp=weather.main.temp;
	var humidity = weather.main.humidity;
  var p = weather.main.pressure;
  ellipse(100,100, temp,temp);
  ellipse(300,100, humidity,humidity);
	s= temp + humidity +p;
	console.log(s);
  var output = document.getElementById('density');
  output.innerHTML = s;
	}
}
