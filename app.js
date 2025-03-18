document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("#searchBtn");
    const input = document.querySelector("input");

    button.addEventListener("click", function () {
        const location = input.value.trim();

        if (location) {
            fetchWeather(location);
            fetchForecast(location);
        } else {
            displayError("Please enter a valid location.");
        }
    });
});

function fetchWeather(location) {
    const apiKey = "b1eeafd271ab3faa4a3c948fe3387fcf"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            displayError(error.message);
        });
}

function fetchForecast(location) {
    const apiKey = "b1eeafd271ab3faa4a3c948fe3387fcf"; 
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not retrieve forecast");
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            displayError(error.message);
        });
}

function displayWeather(data) {
    document.querySelector(".weather-info").innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
        <p>${data.weather[0].description}</p>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
    let forecastHTML = "<h3>5-Day Forecast</h3><div class='forecast-container'>";

    // OpenWeatherMap provides data every 3 hours, we filter to get 1 per day
    const dailyForecasts = data.list.filter((reading, index) => index % 8 === 0);

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
        forecastHTML += `
            <div class="forecast">
                <p>${date}</p>
                <img class="weather-icon" src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather icon">
                <p>${day.weather[0].description}</p>
                <p>🌡 ${day.main.temp}°C</p>
            </div>
        `;
    });

    forecastHTML += "</div>";
    document.querySelector(".forecast-info").innerHTML = forecastHTML;
}

function displayError(message) {
    document.querySelector(".weather-info").innerHTML = `<p class="error">${message}</p>`;
    document.querySelector(".forecast-info").innerHTML = ""; // Clear forecast section
}
