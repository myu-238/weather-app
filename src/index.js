function formatDateAndTime(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
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
    return `${day} ${hours}:${minutes}`;
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

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temperature");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temperature");

    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");

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
