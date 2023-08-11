// ------------------------------    UPDATE TIME     ------------------------------

function formatDateAndTime() {
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
    let currentDay = days[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let time = `${hours}:${minutes}`;

    let currentDateAndTime = document.querySelector("#current-time");
    currentDateAndTime.innerHTML = `${currentDay}, ${time}`;
}
formatDateAndTime();

// -----------------------------    SEARCH ENGINE    ------------------------------
// When user searches for a city and clicks on button, it displays the city name and temperature.
function displayCityName(response) {
    let searchCity = response.data.name;
    let showCityName = document.getElementById("display-city-name");
    showCityName.innerHTML = searchCity;
}
function displayCityTemp(response) {
    let cityTemp = Math.round(response.data.main.temp);
    let showTemp = document.getElementById("current-temperature");
    showTemp.innerHTML = cityTemp;
}

let apiKey = "82b4b4516f612ad1803d4caf874dc244";

document.getElementById("search-button").addEventListener("click", function () {
    let inputCityName = document.getElementById("find-this-city").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityName}&appid=${apiKey}&units=metric`;
    axios
        .get(apiUrl)
        .then(function (response) {
            console.log(response);
            displayCityTemp(response);
            displayCityName(response);
            document.getElementById("find-this-city").value = "";
        })
        .catch(function (error) {
            console.log(error);
        });
});

document
    .getElementById("find-this-city")
    .addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("search-button").click();
            document.getElementById("find-this-city").value = "";
        }
    });

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

// BONUS FEATURE - SEARCH CURRENT LOCATION - which doesnt work by the way
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
