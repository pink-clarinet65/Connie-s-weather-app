function updateCurrentWeather(response) {
  console.log(response.data);
}

function searchCity(city) {
  let apiKey = "7482b6ta250748o436a7585c26ecf30b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateCurrentWeather);
}

function search(event) {
  event.preventDefault();
  let searchFormInputElement = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = searchFormInputElement.value;
  searchCity(searchFormInputElement.value);
}

let searchFormElement = document.querySelector("#search-form");
console.log(searchFormElement);
searchFormElement.addEventListener("submit", search);
