const apiKey = "d0c23fea1640e4b22986ae67ce4d1ed4"; 
const weatherInfoDiv = document.getElementById("weatherInfo");

function getWeather(city = "Gadsden") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                weatherInfoDiv.innerHTML = "City not found.";
            } else {
                const weather = data.weather[0].description;
                const temp = data.main.temp;
                const humidity = data.main.humidity;
                const wind = data.wind.speed;

                weatherInfoDiv.innerHTML = `
                    <h2>${city}</h2>
                    <p>Weather: ${weather}</p>
                    <p>Temperature: ${temp}°C</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${wind} m/s</p>
                `;
            }
        })
        .catch(error => {
            weatherInfoDiv.innerHTML = "An error occurred. Please try again.";
            console.error(error);
        });
}

// Call the function with the default city "Gadsden" when the page loads
getWeather();

// Handle search button click
function handleSearch() {
    const city = document.getElementById("city").value;
    getWeather(city);
}

document.querySelector("button").addEventListener("click", handleSearch);
