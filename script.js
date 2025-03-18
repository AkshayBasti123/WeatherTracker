document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript file loaded successfully! ✅");

    const weatherBtn = document.getElementById("weatherBtn");
    const forecastBtn = document.getElementById("forecastBtn");
    const input = document.getElementById("location");
    const infoBtn = document.getElementById("infoBtn");
    const infoPanel = document.getElementById("infoPanel");

    if (!weatherBtn || !forecastBtn || !input || !infoBtn || !infoPanel) {
        console.error("Error: One or more elements not found in DOM.");
        return;
    }

    weatherBtn.addEventListener("click", function () {
        console.log("Weather Button Clicked!");
        const location = input.value.trim();
        if (location) {
            fetchWeather(location);
            document.getElementById("forecast").innerHTML = ""; // Clear forecast section
        } else {
            displayError("Please enter a valid location.", "weather");
        }
    });

    forecastBtn.addEventListener("click", function () {
        console.log("Forecast Button Clicked!");
        const location = input.value.trim();
        if (location) {
            fetchForecast(location);
            document.getElementById("weather").innerHTML = ""; // Clear weather section
        } else {
            displayError("Please enter a valid location.", "forecast");
        }
    });

    // ℹ️ Toggle Info Panel
    infoBtn.addEventListener("click", function () {
        console.log("Info Button Clicked!");
        if (infoPanel.style.display === "none" || infoPanel.style.display === "") {
            infoPanel.style.display = "block";
        } else {
            infoPanel.style.display = "none";
        }
    });
});
