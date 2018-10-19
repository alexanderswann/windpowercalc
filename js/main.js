var request = new XMLHttpRequest();


request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?id=2172797&APPID=d877a4ead94677246082ffd6ec22cb8a', true);
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

}

request.send();

var T = 21;
var RH = 88;
var p = 1021;

var Rd = 287.058;
var Rv = 461.495;
var a = 17.62;
var b = 243.12;
var md = 0.028964;
var mv = 0.018016;
var r = 8.314;
var Ts = (b * (Math.log(RH / 100) + a * T / (b + T))) / (a - (Math.log(RH / 100) + a * T / (b + T)));
var p1 = (6.1078 * (Math.pow(10, ((7.5 * Ts) / (Ts + 237.3)))));
var pv = p1 * (.01 * RH)
var pd = p - pv;
var pp = ((pd * 100) / (Rd * (T + 273.15))) + ((pv * 100) / (Rv * (T + 273.15)));
var ρ = ((100 * pd * md) + (100 * pv * mv)) / ((T + 273.15) * r);
ρ = ρ.toFixed(4);
//
// // Create a request variable and assign a new XMLHttpRequest object to it.
// var data = new XMLHttpRequest();
//
// // Open a new connection, using the GET request on the URL endpoint
// request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?id=2172797&APPID=d877a4ead94677246082ffd6ec22cb8a', true);
//
// request.onload = function () {
//   // Begin accessing JSON data here
//   }
// }
//
// // Send request
// request.send();

// var request = new XMLHttpRequest();
//
// request.open('GET', 'data.json', true);
//
// request.onload = function () {
// 	// begin accessing JSON data here
// 	var data = JSON.parse(this.response);
//
//   for (var i = 0; i < data.length; i++) {
// 		console.log(data[i].name + ' is a ' + data[i].race + '.');
// 	}
// }
// request.send();
