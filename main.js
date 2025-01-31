const apiUrl = "http://localhost/Weatherapp/connection.php";

// Function to fetch weather data
async function checkWeather(city = "Gadsden") {
    const cacheKey = `weather_${city}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const lastUpdated = new Date(parsedData.timestamp);
        const now = new Date();

        // Use cache if it's less than 2 hours old
        if ((now - lastUpdated) / (1000 * 60 * 60) < 2) {
            updateDOM(parsedData);
            console.log("Loaded from cache:", parsedData);
            return;
        }
    }

    try {
        const response = await fetch(`${apiUrl}?q=${city}`);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
        }

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }

        // Store data in localStorage with timestamp
        data.timestamp = new Date().toISOString();
        localStorage.setItem(cacheKey, JSON.stringify(data));

        // Update UI
        updateDOM(data);
        console.log("Fetched from API and cached:", data);
    } catch (error) {
        alert(error.message);
    }
}

// Function to update the UI
function updateDOM(data) {
    document.querySelector(".temp").innerText = `${data.temp}°C`;
    document.querySelector(".city").innerText = data.city;
    document.querySelector(".humidity").innerText = `${data.humidity}%`;
    document.querySelector(".pressure").innerText = `${data.pressure} hPa`;
    document.querySelector(".wind-dir").innerText = `${data.wind} km/h`;
    document.querySelector(".description").innerText = "Weather data retrieved successfully.";
}

// Event listener for search button
document.querySelector(".search-button").addEventListener("click", (event) => {
    event.preventDefault();
    const cityInput = document.querySelector(".input").value;
    if (cityInput) {
        window.history.pushState(null, "", `?q=${encodeURIComponent(cityInput)}`);
        checkWeather(cityInput);
    } else {
        alert("Please enter a city name!");
    }
});

// Load weather for city from URL or default to "Gadsden"
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('q') || "Gadsden";
    checkWeather(city);
};
