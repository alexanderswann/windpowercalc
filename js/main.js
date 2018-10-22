var weather;
var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&APPID=d877a4ead94677246082ffd6ec22cb8a';
var units = '&units=metric';
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
  	var T=weather.main.temp;
    var TF =(T * (9/5)) + 32;
  	var RH = weather.main.humidity;
    var p = weather.main.pressure;
    var w = weather.wind.speed;
    var wd = weather.wind.deg;
    var Rd = 287.058;
    var Rv = 461.495;
    var a = 17.62;
    var b = 243.12;
    var md = 0.028964;
    var mv = 0.018016;
    var r = 8.314;
    var Ts = (b * (Math.log(RH / 100) + a * T / (b + T))) / (a - (Math.log(RH / 100) + a * T / (b + T)));
    var TsF=(Ts * (9/5)) + 32;
    var p1 = (6.1078 * (Math.pow(10, ((7.5 * Ts) / (Ts + 237.3)))));
    var pv = p1 * (.01 * RH)
    var pd = p - pv;
    var pp = ((pd * 100) / (Rd * (T + 273.15))) + ((pv * 100) / (Rv * (T + 273.15)));
    var ρ = ((100 * pd * md) + (100 * pv * mv)) / ((T + 273.15) * r);


    ellipse(100,100, T,T);
    ellipse(300,100, RH,RH);

    var outputT = document.getElementById('T');
    outputT.innerHTML = 'The temperature is ' +T+' °C'+' or '+ TF.toFixed(2) + ' °F' ;
    var outputRH = document.getElementById('RH');
    outputRH.innerHTML = 'The humidity is ' +RH+'%';
    var outputp = document.getElementById('p');
    outputp.innerHTML = 'The pressure is ' +p+' hpa';

    var outputw = document.getElementById('w');
    outputw.innerHTML = 'The wind speed is ' +w+' m/s';
    var outputwd = document.getElementById('wd');
    outputwd.innerHTML = 'The wind direction is ' +wd+'°';

    var outputTs = document.getElementById('Ts');
    outputTs.innerHTML = 'The dewpoint is ' +Ts.toFixed(4)+' °C'+' or '+ TsF.toFixed(4) + ' °F';

    var outputp1 = document.getElementById('p1');
    outputp1.innerHTML = 'The saturation vapor pressure is ' +p1.toFixed(4)+' hpa';

    var outputpv = document.getElementById('pv');
    outputpv.innerHTML = 'The water vapor pressure is ' +pv.toFixed(4)+' hpa';

    var outputpd = document.getElementById('pd');
    outputpd.innerHTML = 'The pressure of dry air is ' +pd.toFixed(4)+' hpa';

    var outputρ = document.getElementById('ρ');
    outputρ.innerHTML = 'The air density is ' +ρ.toFixed(4)+' kg/m³';
  	}
}
