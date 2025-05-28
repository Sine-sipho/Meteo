function refreshWeather(response) {
  let temperatureElement = document.querySelector(".current-temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.getElementById("city");
  cityElement.innerHTML = response.data.city;
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
  searchInput.value = "";
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("East London");
