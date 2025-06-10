function refreshWeather(response) {
  let temperatureElement = document.querySelector(".current-temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.getElementById("city");
  cityElement.innerHTML = response.data.city;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let rainElement = document.querySelector("#pressure");
  rainElement.innerHTML = `${response.data.temperature.pressure}hpa`;
  let windElement = document.querySelector("#windspeed");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = getDate(date);

  getForecast(response.data.city);
}
function addZero(number) {
  if (number < 10) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
}
function getDate(date) {
  let hour = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekdays[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "34dcb3cfedt4654990206a21091oab73";
  let apiLink = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiLink).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.getElementById("search-form-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let key = "34dcb3cfedt4654990206a21091oab73";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=metric`;
  axios.get(url).then(displayForecast);
}
function displayForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach((day, index) => {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <div class="weather-forecast-icon">
          <img src="${day.condition.icon_url}" />
          </div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.maximum
            )}°</div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}°</div>
          </div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
searchCity("East London");
