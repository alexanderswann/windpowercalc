var weather;
var T;
var RH;
var p;
var Rd;
var Rv;
var a;
var b;
var md;
var mv;
var r;
var Ts;
var p1;
var pv;
var pd;
var pp;
var ρ;


function setup() {
  loadJSON('https://api.openweathermap.org/data/2.5/weather?id=4196508&APPID=d877a4ead94677246082ffd6ec22cb8a&units=metric', gotData);
}

function gotData(data) {
  weather = data;
}

function draw(){
	if(weather){
	T=weather.main.temp;
	RH = weather.main.humidity;
  p = weather.main.pressure;
	Rd = 287.058;
  Rv = 461.495;
  a = 17.62;
  b = 243.12;
  md = 0.028964;
  mv = 0.018016;
  r = 8.314;
  Ts = (b * (Math.log(RH / 100) + a * T / (b + T))) / (a - (Math.log(RH / 100) + a * T / (b + T)));
  p1 = (6.1078 * (Math.pow(10, ((7.5 * Ts) / (Ts + 237.3)))));
  pv = p1 * (.01 * RH)
  pd = p - pv;
  pp = ((pd * 100) / (Rd * (T + 273.15))) + ((pv * 100) / (Rv * (T + 273.15)));
  ρ = ((100 * pd * md) + (100 * pv * mv)) / ((T + 273.15) * r);
  ρ = ρ.toFixed(4);
	console.log(ρ);
	}

}
