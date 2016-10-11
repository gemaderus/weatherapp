/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	//Estado
	var displayCelsius = true;
	var weatherDescriptions;

	//To click in the button

	function clicked(e) {
	  displayCelsius = !displayCelsius;

	  document.getElementById("btnGrades").classList.toggle("is-clicked");

	  renderTemperature(displayCelsius);
	};


	document.getElementById("btnGrades").addEventListener("click", clicked);

	document.addEventListener('DOMContentLoaded', function() {
	  ajaxCall("http://ip-api.com/json", forecast);
	});

	//To handle the function.

	function handleResponse(response) {
	  weatherDescriptions = response.list;
	  updateCity(response.city);
	  updateHour();

	  weatherDescriptions.forEach(function (weatherDescription, index) {
	    var nodo = document.getElementById('weather-'+index);

	    if (index === 0) {
	      updateDescription(nodo, weatherDescription);
	    } else {
	      updateDay(nodo, weatherDescription);
	    }

	    updateTemperature(nodo, weatherDescription, displayCelsius);
	    updateIcon(nodo, weatherDescription);
	  });
	}

	function ajaxCall(url, callback) {
	  var xhr = new XMLHttpRequest();
	  var data;
	  xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	      data = JSON.parse(xhr.responseText);
	      callback(data);
	    } else if (xhr.readyState === 4 && xhr.status !== 200) {
	       document.getElementById("error").style.display= "block";
	    }
	  }

	  xhr.open("GET", url, true);
	  xhr.send();
	};

	function forecast(data) {
	  var latitude = data.lat;
	  var longitude = data.lon;
	  var url = "http://api.openweathermap.org/data/2.5/forecast/daily?cnt=6&units=metric&lat=" + latitude + "&lon=" + longitude + "&APPID=90785aafb1e217c4e92fdcaa6b7db53a"; //We need the url to the location.

	  ajaxCall(url, handleResponse);
	};


	//To update the description of the current day.
	function updateDescription(nodo, data) {
	  var description = data.weather[0].description;
	  nodo.querySelector(".Weather-description").innerHTML = description;
	}

	//To update the City name.
	function updateCity(data) {
	  var name = data.name;
	  var nodo = document.getElementById('city');
	  nodo.innerHTML= name;
	}

	//To update the days in the forecast.

	function updateDay(nodo, day) {
	  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	  var weekDay = new Date(day.dt * 1000).getDay();
	  nodo.querySelector(".Forecast-day").innerHTML = days[weekDay];
	}

	//To update the icons depending of the day.

	function updateIcon(nodo, icon) {
	  var idIcon = icon.weather[0].id;
	  var iconDigit = Math.round(idIcon / 100);

	  nodo.querySelectorAll(".Icon-weather").forEach(function (item, index, array) {
	    item.classList.toggle("Thunderstorm", iconDigit === 2);
	    item.classList.toggle("Drizzle", iconDigit === 3);
	    item.classList.toggle("Rainy", iconDigit === 5);
	    item.classList.toggle("Snow", iconDigit === 6);
	    item.classList.toggle("Mist", iconDigit === 7);
	    item.classList.toggle("Clear-sky", +idIcon === 800);
	    item.classList.toggle("Cloudy", +idIcon > 800);
	    item.classList.toggle("Extreme", iconDigit === 9);
	  });
	};

	// To change the celsius in farenheit and farenheit in celsius when the button is clicked.

	function updateTemperature(nodo, temperature, isCelsius) {
	  var temp = temperature.temp.day;
	  nodo.querySelectorAll('.Grades-type').forEach(function(item, index, array) {
	    if (isCelsius) {
	      temp = convertToGrades(temp);
	      item.textContent = "C";
	    } else {
	      temp = covertToFarenheit(temp);
	      item.textContent = "F";
	    }
	  });

	  nodo.querySelectorAll(".Grades").forEach(function(item, index, array) {
	    item.innerHTML = temp;
	  });
	}

	//We need the hour because the background image is changing with it.

	function updateHour() {
	  var getHour = new Date().getHours();
	  var image = document.getElementById("content");
	  if (getHour >= 6 && getHour <= 14) {
	    image.classList.add("Morning");
	  } else if (getHour > 14 && getHour < 20) {
	    image.classList.add("Evening");
	  } else {
	    image.classList.add("Night");
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
	    var nodo = document.getElementById('weather-'+index);
	    updateTemperature(nodo, weatherDescription, isCelsius);
	  });
	}


/***/ }
/******/ ]);