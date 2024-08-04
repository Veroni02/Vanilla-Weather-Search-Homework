function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let daysInWeek = week[date.getDay()];

  return `${daysInWeek} ${hours}:${minutes}`;
}

function UpdateWeatherInfos(response) {
  //city
  let cityElement = document.querySelector("#weather-app-city");
  let city = response.data.city;
  cityElement.innerHTML = city;

  //temperature
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;

  //humidity
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `${humidity}%`;

  //wind speed
  let windElement = document.querySelector("#windSpeed");
  let wind = response.data.wind.speed;
  windElement.innerHTML = `${wind}km/h`;

  // condition description
  let conditionElement = document.querySelector("#condition");
  let condition = response.data.condition.description;
  conditionElement.innerHTML = condition;

  //time
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDate(date);

  //icon
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                alt="weather-app-icon"
                class="weather-app-icon"
                id="weather-app-icon"
              />`;
}

function handlWeatherDetails(city) {
  let apiKey = "a23a5ab0t0ce0fbdaab943206coccdb5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(UpdateWeatherInfos);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputEle = document.querySelector("#search-form-input");
  handlWeatherDetails(searchInputEle.value);
}

let searchInputElement = document.querySelector("#search-form");
searchInputElement.addEventListener("submit", handleSearchSubmit);
