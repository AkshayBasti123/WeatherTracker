const apiKey = 'b1eeafd271ab3faa4a3c948fe3387fcf';

function getWeather() {
    const city = document.getElementById("city").value;
    const weatherDiv = document.getElementById("weather");
    const errorDiv = document.getElementById("error");

    if (!city) {
        errorDiv.textContent = "Please enter a city!";
        weatherDiv.innerHTML = "";
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                errorDiv.textContent = "City not found!";
                weatherDiv.innerHTML = "";
                return;
            }

            errorDiv.textContent = "";
            const iconCode = data.weather[0].icon;
            weatherDiv.innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" class="weather-icon">
                <p>🌡️ ${data.main.temp}°C</p>
                <p>☁️ ${data.weather[0].description}</p>
            `;
        })
        .catch(() => {
            errorDiv.textContent = "Error fetching weather data!";
            weatherDiv.innerHTML = "";
        });
}
