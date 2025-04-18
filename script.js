document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript file loaded successfully! ✅");

    const weatherBtn = document.getElementById("weatherBtn");
    const forecastBtn = document.getElementById("forecastBtn");
    const input = document.getElementById("location");

    if (!weatherBtn || !forecastBtn || !input) {
        console.error("Error: One or more elements not found in DOM.");
        return;
    }

    weatherBtn.addEventListener("click", function () {
        console.log("Weather Button Clicked!");
        const location = input.value.trim();
        if (location) {
            fetchWeather(location);
            document.getElementById("forecast").innerHTML = "";
        } else {
            displayError("Please enter a valid location.", "weather");
        }
    });

    forecastBtn.addEventListener("click", function () {
        console.log("Forecast Button Clicked!");
        const location = input.value.trim();
        if (location) {
            fetchForecast(location);
            document.getElementById("weather").innerHTML = ""; 
        } else {
            displayError("Please enter a valid location.", "forecast");
        }
    });
});

function fetchWeather(location) {
    const apiKey = "b1eeafd271ab3faa4a3c948fe3387fcf";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    console.log(`Fetching Current Weather from: ${url}`);

    fetch(url)
        .then(response => {
            console.log("API Response Status:", response.status);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Weather Data:", data);
            displayWeather(data);
        })
        .catch(error => {
            console.error("Fetch Error:", error);
            displayError(error.message, "weather");
        });
}

function fetchForecast(location) {
    const apiKey = "b1eeafd271ab3faa4a3c948fe3387fcf";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

    console.log(`Fetching 5-Day Forecast from: ${url}`);

    fetch(url)
        .then(response => {
            console.log("API Response Status:", response.status);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Forecast Data:", data);
            displayForecast(data);
        })
        .catch(error => {
            console.error("Fetch Error:", error);
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

document.getElementById("infoBtn").addEventListener("click", function () {
    const infoBox = document.getElementById("infoBox");
    infoBox.style.display = infoBox.style.display === "none" || infoBox.style.display === "" ? "block" : "none";
});
