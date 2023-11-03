document.addEventListener("DOMContentLoaded", function () {
    // Step 1
    const apikey = 'fdb37a9daf4252b00b4ef65eccc0c54c' ;
  
    // Step 2
    const cityinput = document.getElementById("cityInput");
    const btun = document.getElementById("btun");
    const weatherinfo = document.getElementById("weather-info");
  
    // Step 3
    btun.addEventListener("click", function () {
      // Step 4
      const city = cityinput.value;
  
      if (city.trim() === "") {
        alert("Please enter valid a city name");
        return;
      }
  
      // Step 5
      const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
      
      fetch(apiurl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("City not found");
          }
          return response.json();
        })
        .then((data) => {
          // Step 7
          const weatherdescription = data.weather[0].description;
          const maintemperature = data.main.temp;
          const windspeed = data.wind.speed;
  
          const weatherHTML = `
            <p>Weather: ${weatherdescription}</p>
            <p>Main Temperature: ${maintemperature} Kelvin</p>
            <p>Wind Speed: ${windspeed} m/s</p>
          `;
  
          weatherinfo.innerHTML = weatherHTML;
        })
        .catch((error) => {
          // Step 6
          if (error.message === "City not found") {
            alert("City doesnot exist . Please enter a valid city name.");
          } else {
            alert("An error occurred. Please try again later.");
          }
        });
    });
  });
  