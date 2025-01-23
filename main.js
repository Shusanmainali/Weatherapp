const apiUrl = "http://localhost/Weatherapp/connection.php"; // Update to match your file path

// Function to fetch weather data
async function checkWeather(city = "Gadsden") {
    try {
        const response = await fetch(`${apiUrl}?q=${city}`);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
        }

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }

        // Update the DOM
        document.querySelector(".temp").innerText = `${data.temp}°C`;
        document.querySelector(".city").innerText = data.city;
        document.querySelector(".humidity").innerText = `${data.humidity}%`;
        document.querySelector(".pressure").innerText = `${data.pressure} hPa`;
        document.querySelector(".wind-dir").innerText = `${data.wind} km/h`;
        document.querySelector(".description").innerText = "Weather data retrieved successfully.";
    } catch (error) {
        alert(error.message);
    }
}

// Event listener for the search button
document.querySelector(".search-button").addEventListener("click", (event) => {
    event.preventDefault();  // Prevent form submission (if it's inside a form)
    
    const cityInput = document.querySelector(".input").value;
    if (cityInput) {
        // Update the URL with the new city name without reloading the page
        window.history.pushState(null, "", `?q=${encodeURIComponent(cityInput)}`);
        
        // Call the weather API to fetch data for the city
        checkWeather(cityInput);
    } else {
        alert("Please enter a city name!");
    }
});

// Automatically load weather for the city specified in the URL or default to "Gadsden"
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('q') || "Gadsden";  // Default to "Gadsden" if no city in URL
    checkWeather(city);
};