//  Define the API key
const apikey = 'fdb37a9daf4252b00b4ef65eccc0c54c';

//  Get references to HTML elements
const cityinput = document.getElementById("cityInput"); // Input field for city name
const btun = document.getElementById("btun"); // Button for submitting the city name
const weatherinfo = document.getElementById("weather-info"); // Element to display weather information

//  Add a click event listener to the button
btun.addEventListener("click", function () {
    //  Get the city name from the input field
    const city = cityinput.value;

    if (city.trim() === "") {
        // Check if the input is empty and provide an alert if it is
        alert("Please enter a valid city name");
        return;
    }

    //  Create the API URL for the weather data
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    fetch(apiurl)
        .then((response) => {
            if (!response.ok) {
                // Check if the response is not OK and throw an error if city not found
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {
            //  Extract weather information from the API response
            const weatherdescription = data.weather[0].description; // Weather description
            const maintemperature = data.main.temp; // Main temperature
            const windspeed = data.wind.speed; // Wind speed

            // Create HTML to display weather information
            const weatherHTML = `
                <p>Weather: ${weatherdescription}</p>
                <p>Main Temperature: ${maintemperature} Kelvin</p>
                <p>Wind Speed: ${windspeed} m/s</p>
            `;

            // Display the weather information in the designated element
            weatherinfo.innerHTML = weatherHTML;
        })
        .catch((error) => {
            //  Handle errors
            if (error.message === "City not found") {
                // Check if the error message indicates a city not found
                alert("City does not exist. Please enter a valid city name.");
            } else {
                // Handle other errors
                alert("An error occurred. Please try again later.");
            }
        });
});
