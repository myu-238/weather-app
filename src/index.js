function formatDateAndTime(timestamp) {
    let now = new Date(timestamp);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let currentDay = days[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let time = `${hours}:${minutes}`;

    let currentDateAndTime = document.querySelector("#current-time");
    currentDateAndTime.innerHTML = `${currentDay}, ${time}`;
}

function displayWeather(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#current-temperature");
    let cityElement = document.querySelector("#city-name");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date-time");
    let iconElement = document.querySelector("#main-icon");

    celsiusTemperature = response.data.temperature.current;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDateAndTime(response.data.time * 1000);
    iconElement.setAttribute(
        "src",
        `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
    iconElement.setAttribute("alt", response.data.condition.description);
}

function search(city) {
    let apiKey = "28842fobf1a190b0t62a268683055905";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

search("New York");

/* ----------------- MATT'S SOLUTION TO SEARCH ENGINE
// There's no precipitation, because the API only shows it when it rains. Matt removed the precipitation in HTML.

function displayWeatherCondition(response) {
        console.log(response.data)
        document.querySelector("#city").innerHTML = response.data.name;
        document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
        document.querySelector("#humidity").innnerHTML = response.data.main.humidity;
        document.querySelector("#wind").innnerHTML = Math.round(response.data.main.wind.speed);
        document.querySelector("#description").innnerHTML = response.data.main.weather[0].main;
}

function search(event) {
        event.preventDefault();
        let apiKey = "82b4b4516f612ad1803d4caf874dc244"
        let city = document.querySelector("#city-input").value;
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(getUrl).then(displayWeatherCondition);
}
*/

/* ---------------------------  RESEARCH ON LOAD - DISPLAY A CITY AS AN EXAMPLE ----------------------
function searchCity(city) {
        let apiKey = "82b4b4516f612ad1803d4caf874dc244";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
        event.preventDefault();
        let city = document.querySelector("city-input").value;
        searchCity(city);
}

searchCity("New York");
*/

// BONUS FEATURE - SEARCH CURRENT LOCATION
function showCurrentLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "82b4b4516f612ad1803d4caf874dc244";
    let apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
    axios.get(apiUrl).then(function (response) {
        displayCityTemp(response);
        displayCityName(response);
    });
}

let currentLocationButton = document.getElementById("current-location-button");
currentLocationButton.addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
});

// ------------------------------------ SOLUTION FOR CURRENT LOCATION BUTTON by Matt --------------------------------
/*
function searchLocation()

function getCurrentLocation(event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(function(position) {
                do_something(position.coords.latitude, position.coords.longitude);
        });
}

let currentLocationButton = document.qeurySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
*/

// ----------------    CONVERSION TO CELSIUS FAHRENHEIT  ------------------
/*
function convertTempToCelsius(event) {
        event.preventDefault;
        let changeToCelsius = document.getElementById("current-temperature");
        changeToCelsius.innerHTML = 12;
}

let CelsiusLink = document.getElementById("linkCelsius");
CelsiusLink.addEventListener("click", convertTempToCelsius);

function convertTempToFahrenheit(event) {
        event.preventDefault;
        let changeToFahrenheit = document.getElementById("current-temperature");
        changeToFahrenheit.innerHTML = 53;
}

let FahrenheitLink = document.getElementById("linkFahrenheit");
FahrenheitLink.addEventListener("click", convertTempToFahrenheit);
*/
