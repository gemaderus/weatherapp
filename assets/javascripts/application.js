var $ = require('jquery');

//Estado
var displayCelsius = true;
var weatherDescriptions; //Almacenamos el valor de la Api

function clicked(e) {
  displayCelsius = !displayCelsius;
  $(".btn-grades").toggleClass("is-clicked");

  renderTemperature(displayCelsius);
};

$(".btn-grades").on("click", clicked);

//To get the localization

$(function() {
  $.getJSON("http://ip-api.com/json", function(location) {
  var latitude = location.lat;
  var longitude = location.lon;
  var url = "http://api.openweathermap.org/data/2.5/forecast/daily?cnt=6&units=metric&lat=" + latitude + "&lon=" + longitude + "&APPID=90785aafb1e217c4e92fdcaa6b7db53a"; //Location url.
    forecast(url); //We need forecast url to update the datas.
  }).fail(function(error){
    $(".Error-message").css({display: "block"});
  });
});

//To handle the function.
//
function handleResponse(response) {
  weatherDescriptions = response.list;
  updateCity(response.city);
  updateHour();

  weatherDescriptions.forEach(function (weatherDescription, index) {//each recibe una función cuyo argumento es el índice y un elemento del DOM. Para hacer uso de jquery hay que convertirlo en un objeto jquery//
    // weatherDescriptions es la lista entera y weatherDescription es cada elemento en cada iteración.
    var nodo = $('#weather-'+index);

    if (index === 0) {
      updateDescription(nodo, weatherDescription);
    } else {
      updateDay(nodo, weatherDescription);
    }

    updateTemperature(nodo, weatherDescription, displayCelsius);
    updateIcon(nodo, weatherDescription);
  });
}

//To get the forecast url

function forecast(url) {
  $.getJSON(url, handleResponse);
};

//To update the description of the current day.

function updateDescription(nodo, data) {
  var description = data.weather[0].description;
  nodo.find(".Weather-description").html(description);
}

//To update the City name.

function updateCity(data) {
  var name = data.name;
  var nodo = $('#city');
  nodo.html(name);
}

//To update the days in the forecast.

function updateDay(nodo, day) {
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var weekDay = new Date(day.dt * 1000).getDay(); //Tue Sep 13 2016 14:00:00 GMT+0200 (CEST)
  nodo.find(".Forecast-day").html(days[weekDay]);
}

//To update the icons depending of the day.

function updateIcon(nodo, icon) {
  var idIcon = icon.weather[0].id;//esto no me devuelve un número
  var iconDigit = Math.round(idIcon / 100);

  nodo.find(".Icon-weather").toggleClass("Thunderstorm", iconDigit === 2);
  nodo.find(".Icon-weather").toggleClass("Drizzle", iconDigit === 3);
  nodo.find(".Icon-weather").toggleClass("Rainy", iconDigit === 5);
  nodo.find(".Icon-weather").toggleClass("Snow", iconDigit === 6);
  nodo.find(".Icon-weather").toggleClass("Mist", iconDigit === 7);
  nodo.find(".Icon-weather").toggleClass("Clear-sky", +idIcon === 800);
  nodo.find(".Icon-weather").toggleClass("Cloudy", +idIcon > 800);
  nodo.find(".Icon-weather").toggleClass("Extreme", iconDigit === 9);
}

// To change the celsius in farenheit and farenheit in celsius when the button is clicked.

function updateTemperature(nodo, temperature, isCelsius) {
  var temp = temperature.temp.day;
  if (isCelsius) {
    temp = convertToGrades(temp);
    nodo.find('.Grades-type').text("C");
  } else {
    temp = covertToFarenheit(temp);
    nodo.find('.Grades-type').text("F");
  }
  nodo.find(".Grades").html(temp);
}

//We need the hour because the background image is changing with it.

function updateHour() {
  var getHour = new Date().getHours();
  var image = $(".Content");
  if (getHour >= 6 && getHour <= 14) {
    image.addClass("Morning");
  } else if (getHour > 14 && getHour < 20) {
    image.addClass("Evening");
  } else {
    image.addClass("Night");
  }
}

//To convert to Farenheit

function covertToFarenheit(temp){
  return Math.round(temp * 9/5) + 32;
}

//To convert to Celsius

function convertToGrades(temp) {
  return Math.round(temp);
}

//We need through each of the nodes to update the temperature

function renderTemperature(isCelsius) {
  weatherDescriptions.forEach(function (weatherDescription, index) {
    var nodo = $('#weather-'+index);
    updateTemperature(nodo, weatherDescription, isCelsius);
  });
}
