const apiKey = 'fdb37a9daf4252b00b4ef65eccc0c54c'; // Define the API key
// Getting references to HTML elements
const cityInput = document.getElementById("cityInput"); // Input field for city name
const btun = document.getElementById("btun"); // Button for submitting the city name
const container = document.getElementById("weather-info"); // Element to display weather information

// Adding a click event listener to the button
btun.addEventListener("click", function () {
    const city = cityInput.value; // Get the city name from the input field

    if (city.trim() === "") {
        alert("Please enter a valid city name");
        return;
    }

    // Creating the API URL for the weather data
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            const weatherDescription = data.weather[0].description; // Weather description
            const mainTemperature = Math.round(data.main.temp - 273.15); // Main temp converted to °C
            const windSpeed = data.wind.speed; // Wind speed

            // Creating HTML to display weather information
            const weatherHTML = `
                <p>The Weather in ${city} is ${weatherDescription}</p>
                <p>The Temperature is ${mainTemperature}°C with a Wind Speed of ${windSpeed} m/s</p>
                <p> _____________________________________________________________</p>
            `;

            // Append the new weather information to the existing content
            container.innerHTML += weatherHTML;

            renderHTML(data);
        })
        .catch(error => {
            if (error.message === "City not found") {
                alert("City does not exist. Please enter a valid city name.");
            } else {
                alert("An error occurred. Please try again later.");
            }
        });
});
