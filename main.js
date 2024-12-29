const apiKey = "d0c23fea1640e4b22986ae67ce4d1ed4";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

        async function checkWeather(city = "Gadsden") {
            try {
                const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`);
                if (!response.ok) {
                    throw new Error("City not found");
                }

                const data = await response.json();

                // Extract weather details
                const temperature = Math.round(data.main.temp);
                const humidity = data.main.humidity;
                const pressure = data.main.pressure;
                const windSpeed = Math.round(data.wind.speed);
                const windDirection = data.wind.deg;
                const clouds = data.clouds.all;
                const visibility = (data.visibility / 1000).toFixed(1); // Convert to kilometers
                const weatherIcon = data.weather[0].icon;
                const weatherDescription = data.weather[0].description;

                // Update weather details in the DOM
                document.querySelector(".temp").innerText = `${temperature}°C`;
                document.querySelector(".city").innerText = data.name;
                document.querySelector(".humidity").innerText = `${humidity}%`;
                document.querySelector(".pressure").innerText = `${pressure} hPa`;
                document.querySelector(".clouds").innerText = `${clouds}%`;
                document.querySelector(".visibility").innerText = `${visibility} km`;
                document.querySelector(".wind-dir").innerText = `${windSpeed} km/h, ${windDirection}°`;
                document.querySelector(".description").innerText = weatherDescription;

                // Update weather icon
                const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
                document.querySelector(".icon").src = iconUrl;
                document.querySelector(".icon").alt = weatherDescription;
            } catch (error) {
                alert(error.message);
            }
        }

        // Event listener for the search button
        document.querySelector(".search-button").addEventListener("click", () => {
            const cityInput = document.querySelector(".input").value;
            if (cityInput) {
                checkWeather(cityInput);
            } else {
                alert("Please enter a city name!");
            }
        });

        // Automatically check weather for the default city on page load
        window.onload = () => {
            checkWeather();
        };
        