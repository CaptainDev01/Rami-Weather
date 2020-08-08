"use strict";
var WeatherApp = /** @class */ (function () {
  function WeatherApp(search, searchTimeOut) {
    this.search = search;
    this.searchTimeOut = searchTimeOut;
    this.search = search;
    this.search.addEventListener("keyup", this.getWeatherStatus);
  }
  WeatherApp.prototype.getWeatherStatus = function (e) {
    if (this.searchTimeOut || e.target.value === "") {
      clearTimeout(this.searchTimeOut);
    }
    this.searchTimeOut = setTimeout(function () {
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          e.target.value +
          "&appid=4b84df23aaaae3c3ff6535d1cdc6e1db&units=metric"
      );
      xhr.send();
      xhr.addEventListener("load", function () {
        var container = document.querySelector(".card-container");
        var data = JSON.parse(xhr.response);
        try {
          var card =
            '<div class="card">\n          <h2 class="card-title">' +
            data.name +
            '</h2>\n          <img title="' +
            data.weather[0].description +
            '" draggable="false" src="./assets/' +
            data.weather[0].icon +
            '.svg" />\n          <h3>' +
            Math.round(data.main.temp) +
            "&deg;</h3>\n          </div>";
          container.innerHTML = card;
        } catch (_a) {
          if (e.target.value.length === 0) {
            container.innerHTML = "";
          } else {
            container.innerHTML = "<h2>no results found</h2>";
          }
        }
      });
    }, 700);
  };
  return WeatherApp;
})();
var search = document.querySelector("#Search_Cities");
var searchTimeOut;
var cardsContainer = document.querySelector(".cards");
var weatherApp = new WeatherApp(search, searchTimeOut);
window.addEventListener("unload", function () {
  return (search.value = "");
});
