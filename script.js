const apiKey = "b1eeafd271ab3faa4a3c948fe3387fcf";

const cityInput = document.getElementById("cityInput");
const currentWeatherBtn = document.getElementById("currentWeatherBtn");
const forecastBtn = document.getElementById("forecastBtn");
const weatherResult = document.getElementById("weatherResult");
const forecastContainer = document.getElementById("forecastContainer");
const forecastDiv = document.getElementById("forecast");

currentWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                weatherResult.innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>${data.weather[0].description}</p>
                    <p>🌡️ ${data.main.temp}°C</p>
                `;
            } else {
                weatherResult.innerHTML = `<p style="color: red;">City not found.</p>`;
            }
        })
        .catch(error => console.error("Error fetching weather:", error));
});

forecastBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                forecastContainer.style.display = "block";
                forecastDiv.innerHTML = "";
                
                const dailyForecasts = {};
                data.list.forEach(item => {
                    const date = item.dt_txt.split(" ")[0];
                    if (!dailyForecasts[date]) {
                        dailyForecasts[date] = item;
                    }
                });

                Object.keys(dailyForecasts).slice(0, 5).forEach(date => {
                    const forecast = dailyForecasts[date];
                    forecastDiv.innerHTML += `
                        <div class="forecast-day">
                            <h3>${new Date(date).toLocaleDateString("en-US", { weekday: "long" })}</h3>
                            <p>${forecast.weather[0].description}</p>
                            <p>🌡️ ${forecast.main.temp}°C</p>
                        </div>
                    `;
                });
            } else {
                forecastContainer.style.display = "none";
                weatherResult.innerHTML = `<p style="color: red;">City not found.</p>`;
            }
        })
        .catch(error => console.error("Error fetching forecast:", error));
});

// Toggle Info Panel
document.getElementById("infoBtn").addEventListener("click", function () {
    const panel = document.getElementById("infoPanel");
    panel.style.display = (panel.style.display === "none" || panel.style.display === "") ? "block" : "none";
});
