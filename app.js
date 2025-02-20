function updateCurrentWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  console.log(response.data.temperature.current);
}

function searchCity(city) {
  let apiKey = "7482b6ta250748o436a7585c26ecf30b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateCurrentWeather);
}

function search(event) {
  event.preventDefault();
  let searchFormInputElement = document.querySelector("#search-form-input");

  searchCity(searchFormInputElement.value);
}

let searchFormElement = document.querySelector("#search-form");
console.log(searchFormElement);
searchFormElement.addEventListener("submit", search);
