let date = document.querySelector("#date");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (minute < 10) {
  minute = `0${minute}`;
}
date.innerHTML = `${day} </br>${hour}:${minute}`;

function showTemp(responsive) {
  let temperature = document.querySelector("#number");
  temperature.innerHTML = `${Math.round(responsive.data.main.temp)}°`;
  console.log(responsive.data);
  let city = document.querySelector("#city");
  city.innerHTML = responsive.data.name;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = responsive.data.weather[0].description;
  let wind = document.querySelector("#windSpeed");
  wind.innerHTML = `Wind: ${responsive.data.wind.speed}`;
}

let searchForm = document.querySelector("#search-form");

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#input-form");
  axios
    .get(`${apiUrl}q=${input.value}&appid=${apiKey}&units=metric`)
    .then(showTemp);
}
searchForm.addEventListener("submit", changeCity);
let button = document.querySelector("#currentLocation");
button.addEventListener("submit", (ev) => {
  navigator.geolocation.getCurrentPosition(showCurrentLocationWeather);
});

function showCurrentLocationWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  axios
    .get(
      `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    )
    .then(showTemp);
}

navigator.geolocation.getCurrentPosition(showCurrentLocationWeather);

//new fragment

let apiKey = "2bd326a60dc89a53287e446e819664df";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
