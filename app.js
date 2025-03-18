document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("button");
    const input = document.querySelector("input");

    button.addEventListener("click", function () {
        const location = input.value.trim();

        if (location) {
            fetchWeather(location);
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

function displayWeather(data) {
    document.querySelector(".weather-info").innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
        <p>${data.weather[0].description}</p>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayError(message) {
    document.querySelector(".weather-info").innerHTML = `<p class="error">${message}</p>`;
}
