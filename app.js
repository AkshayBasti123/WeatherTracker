const apiKey = 'b1eeafd271ab3faa4a3c948fe3387fcf'; 

function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherResult = document.getElementById('weatherResult');
    const errorDiv = document.getElementById('error');

    if (!city) {
        errorDiv.textContent = "Please enter a city name.";
        weatherResult.innerHTML = "";
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                errorDiv.textContent = "City not found.";
                weatherResult.innerHTML = "";
                return;
            }

            errorDiv.textContent = "";
            weatherResult.innerHTML = `
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
        })
        .catch(() => {
            errorDiv.textContent = "Error fetching weather data.";
        });
}
