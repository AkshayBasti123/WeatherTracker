document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded successfully!");

    const locationInput = document.getElementById("location-input");
    const currentWeatherBtn = document.getElementById("current-weather-btn");
    const forecastBtn = document.getElementById("forecast-btn");
    const forecastContainer = document.getElementById("forecast-container");
    const forecastDiv = document.getElementById("forecast");

    const infoButton = document.getElementById("info-button");
    const infoBox = document.getElementById("info-box");

    const API_KEY = "b1eeafd271ab3faa4a3c948fe3387fcf";

    currentWeatherBtn.addEventListener("click", async function () {
        const location = locationInput.value.trim();
        if (!location) {
            alert("Please enter a location.");
            return;
        }

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();

            if (data.cod !== 200) {
                alert("Location not found. Please try again.");
                return;
            }

            alert(`Current Weather in ${data.name}: ${data.weather[0].description}, ${data.main.temp}°C`);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Something went wrong. Try again later.");
        }
    });

    // Fetch 5-day forecast
    forecastBtn.addEventListener("click", async function () {
        const location = locationInput.value.trim();
        if (!location) {
            alert("Please enter a location.");
            return;
        }

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();

            if (data.cod !== "200") {
                alert("Location not found. Please try again.");
                return;
            }

            forecastDiv.innerHTML = ""; // Clear previous forecast
            forecastContainer.style.display = "block";

            const dailyForecasts = {};
            data.list.forEach((forecast) => {
                const date = forecast.dt_txt.split(" ")[0];
                if (!dailyForecasts[date]) {
                    dailyForecasts[date] = forecast;
                }
            });

            Object.keys(dailyForecasts).slice(0, 5).forEach((date) => {
                const forecast = dailyForecasts[date];
                const forecastElement = document.createElement("div");
                forecastElement.classList.add("forecast-item");
                forecastElement.innerHTML = `
                    <h3>${new Date(date).toLocaleDateString("en-US", { weekday: "long" })}</h3>
                    <p>${forecast.weather[0].description}</p>
                    <p>🌡️ ${forecast.main.temp}°C</p>
                `;
                forecastDiv.appendChild(forecastElement);
            });
        } catch (error) {
            console.error("Error fetching forecast data:", error);
            alert("Something went wrong. Try again later.");
        }
    });

    // Toggle info box visibility
    if (infoButton && infoBox) {
        infoButton.addEventListener("click", function () {
            infoBox.classList.toggle("hidden");
        });
    } else {
        console.error("One or more elements not found in DOM.");
    }
});

