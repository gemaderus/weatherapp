var $ = require('jquery');

//var clicked = require('./components/clicked');

// $(function(){
//   foo.attachTo("body");

//   hljs.initHighlightingOnLoad();
// });
//
var city = $(".City");
var grades = $(".Grades");
var buttonGrades = $(".btn-grades");
var temperature = $(".Temperature");
var weather = $(".Weather-description");
var gradesType = $(".Grades-type");
var iconWeather = $(".Icon-weather");

//Estado
var displayCelsius = true;
var temperatura;
var temp;
var weatherDescription;

function clicked(e) {
  var temp;
  displayCelsius = !displayCelsius;

  if (displayCelsius) {
    temp = convertToGrades();
  } else {
    temp = covertToFarenheit();
  }

  renderTemperature(temp, displayCelsius);
};

buttonGrades.on("click", clicked);

$(function() {
  $.getJSON("http://ip-api.com/json", function(location) {
  var latitude = location.lat;
  var longitude = location.lon;
  var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=90785aafb1e217c4e92fdcaa6b7db53a";
    forecast(url);
  });
});


//Forecast header

function forecast(url) {
  $.getJSON(url, function(response) {
    city.html(response.name);
    temperatura = (response.main.temp - 273,15);
    grades.html(temperatura);
    weatherDescription = (response.weather[0].description);
    weather.html(weatherDescription);
    iconWeather.html(getIcon());
  });
};

//To convert to Farenheit

function covertToFarenheit(){
  return Math.round(temperatura * 9/5) + 32;
}

//To convert to Celsius
//
function convertToGrades() {
  return temperatura;
}


function renderTemperature(temp, isCelsius) {
  buttonGrades.toggleClass("is-clicked");
  //temperature.html(temp);

  if (displayCelsius) {
    gradesType.text(" C");
  } else {
    gradesType.text(" F");
  }
}

function getIcon() {
  if(weatherDescription === "clear sky") {
    iconWeather.addClass("Clear-sky");
  } else if (weatherDescription === "few clouds") {
    iconWeather.addClass("Few-clouds");
  } else if (weatherDescription === "scattered clouds" || weatherDescription === "broken clouds") {
    iconWeather.addClass("Cloudy");
  } else if (weatherDescription.search("rain") > -1) {
    iconWeather.addClass("Rainy");
  } else if (weatherDescription === "thunderstorm") {
    iconWeather.addClass("Thunderstorm");
  } else if (weatherDescription === "snow") {
    iconWeather.addClass("Snow");
  } else {
    iconWeather.addClass("Mist");
  }
}
