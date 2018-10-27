var api = 'https://api.openweathermap.org/data/2.5/weather';
var apiKey = '&APPID=d877a4ead94677246082ffd6ec22cb8a';
var units = '&units=metric';
var input;
var type;
var rad;
var e;
var weather;
var zipcodeswitch;

function setup() {

	var button = select('#submit');
	button.mousePressed(weatherAsk);

  var buttonallcalc = select('#hidebutton');
	buttonallcalc.mousePressed(allcalchide);

  var outputhidebutton = document.getElementById('hidebutton');

    if (outputhidebutton.style.display === "none") {
     outputhidebutton.style.display = "block";
   } else {
     outputhidebutton.style.display = "none";
   }



	input = select('#city');
	rad = select('#radius');
	e = select('#efficiency');

}

function weatherAsk() {
      if(isNaN(input.value())){
      type = '?q=';
      zipcodeswitch= 'in ';
     }else{
    	type = '?zip=';
      zipcodeswitch= 'in the zipcode ';
     }

	var url = api +type+ input.value() + apiKey + units;
	loadJSON(url, gotData);
}

function gotData(data) {
	weather = data;
	calcs();
}

function allcalchide() {
    var x = document.getElementsByClassName("hide");
    var outputhidebutton = document.getElementById('hidebutton');
    var i;
      for (i = 0; i < x.length; i++) {
           if (x[i].style.display === "none") {
            x[i].style.display = "block";
            outputhidebutton.innerHTML = 'Simplified View';
        } else {
            x[i].style.display = "none";
            outputhidebutton.innerHTML = 'All Calculations';
        }
      }
}

function calcs() {
  createCanvas(340, 200);
	background(0);
	input = select('#city');
	rad = select('#rad');
	e = select('#e');
	var ep = e.value() * 100;
	var T = weather.main.temp;
	var TF = (T * (9 / 5)) + 32;
	var RH = weather.main.humidity;
	var p = weather.main.pressure;
	var ws = weather.wind.speed;
	var wd = weather.wind.deg;
	var Rd = 287.058;
	var Rv = 461.495;
	var a = 17.62;
	var b = 243.12;
	var md = 0.028964;
	var mv = 0.018016;
	var r = 8.314;
	var Ts = (b * (Math.log(RH / 100) + a * T / (b + T))) / (a - (Math.log(RH / 100) + a * T / (b + T)));
	var TsF = (Ts * (9 / 5)) + 32;
	var p1 = (6.1078 * (Math.pow(10, ((7.5 * Ts) / (Ts + 237.3)))));
	var pv = p1 * (0.01 * RH)
	var pd = p - pv;
	var pp = ((pd * 100) / (Rd * (T + 273.15))) + ((pv * 100) / (Rv * (T + 273.15)));
	var ρ = ((100 * pd * md) + (100 * pv * mv)) / ((T + 273.15) * r);

	var w = 0.5 * ρ * (Math.PI * ((Math.pow(rad.value(), 2)))) * (Math.pow(ws, 3)) * e.value();

	ellipse(85, 100, T, T);
	ellipse(255, 100, RH, RH);

	var outputT = document.getElementById('T');
	outputT.innerHTML = 'The temperature is ' + T + ' °C' + ' or ' + TF.toFixed(2) + ' °F';
	var outputRH = document.getElementById('RH');
	outputRH.innerHTML = 'The humidity is ' + RH + '%';
	var outputp = document.getElementById('p');
	outputp.innerHTML = 'The pressure is ' + p + ' hpa';
	var outputws = document.getElementById('ws');
	outputws.innerHTML = 'The wind speed is ' + ws + ' m/s';

	var outputρ = document.getElementById('ρ');
	outputρ.innerHTML = 'The air density is ' + ρ.toFixed(4) + ' kg/m³';
	var outputw = document.getElementById('w');
	outputw.innerHTML = 'The current power production for a wind turbine ' +zipcodeswitch+ input.value() + ' with a blade radius of ' + rad.value() + ' meters and an efficiency of ' + ep + '% is ' + w.toLocaleString(undefined, {maximumFractionDigits:2}) + ' watts';


	var outputwd = document.getElementById('wd');
	outputwd.innerHTML = 'The wind direction is ' + wd + '°';

	var outputTs = document.getElementById('Ts');
	outputTs.innerHTML = 'The dewpoint is ' + Ts.toFixed(4) + ' °C' + ' or ' + TsF.toFixed(4) + ' °F';
	var outputp1 = document.getElementById('p1');
	outputp1.innerHTML = 'The saturation vapor pressure is ' + p1.toFixed(4) + ' hpa';
	var outputpv = document.getElementById('pv');
	outputpv.innerHTML = 'The water vapor pressure is ' + pv.toFixed(4) + ' hpa';
	var outputpd = document.getElementById('pd');
	outputpd.innerHTML = 'The pressure of dry air is ' + pd.toFixed(4) + ' hpa';

  var outputhidebutton = document.getElementById('hidebutton');
  outputhidebutton.style.display = "inline";
}
