function updateCurrentWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#weather-humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#weather-wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
 src= "${response.data.condition.icon_url}"
 id="weather-icon"
/>`;
  getForecast(response.data.city);
  console.log(getForecast);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "7482b6ta250748o436a7585c26ecf30b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="forecast-week">
    <div class="forecast-day">${formatDay(day.time)}</div>
    <div><img src="${day.condition.icon_url}" class="forecast-icon" /></div>
    <div class="forecast-temperatures">
      <div class="forecast-temp-one"><strong>${Math.round(
        day.temperature.maximum
      )}°</strong></div>
      <div class="forecast-temp-one">${Math.round(
        day.temperature.minimum
      )}°</div>
    </div>
  </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}
getForecast("Rabat");
