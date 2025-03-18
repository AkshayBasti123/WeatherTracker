document.addEventListener("DOMContentLoaded", function () {
    const weatherBtn = document.getElementById("weatherBtn");
    const forecastBtn = document.getElementById("forecastBtn");
    const input = document.getElementById("location");

    if (!weatherBtn || !forecastBtn || !input) {
        console.error("Error: One or more elements not found in DOM.");
        return;
    }

    weatherBtn.addEventListener("click", function () {
        const location = input.value.trim();
        if (location) {
            fetchWeather(location);
        } else {
            displayError("Please enter a valid location.", "weather");
        }
    });

    forecastBtn.addEventListener("click", function () {
        const location = input.value.trim();
        if (location) {
            fetchForecast(location);
        } else {
            displayError("Please enter a valid location.", "forecast");
        }
    });
});

function fetchWeather(location) {
    const apiKey = "b1eeafd271ab3faa4a3c948fe3387fcf";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not retrieve weather data.");
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            displayError(error.message, "weather");
        });
}

function fetchForecast(location) {
    const apiKey = "b1eeafd271ab3faa4a3c948fe3387fcf";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not retrieve forecast data.");
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            displayError(error.message, "forecast");
        });
}

function displayWeather(data) {
    document.getElementById("weather").innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>${data.weather[0].description}</p>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
    let forecastHTML = "<h3>5-Day Forecast</h3><div class='forecast-container'>";
    
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
    document.getElementById("forecast").innerHTML = forecastHTML;
}

function displayError(message, elementId) {
    document.getElementById(elementId).innerHTML = `<p class="error">${message}</p>`;
}
