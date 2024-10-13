const countryCodes = require('./countryCodes.js'); 
let isCelsius = true; // Track if the current temperature is in Celsius
let currentTemperatureC = 0; // Variable to store the Celsius temperature
let currentFeelsLike = 0;

function getCountryNameByCode(code) {
    const country = countryCodes.find(country => country.code === code);
    return country ? country.name : 'Country not found';
}
function getWeather() {
    // Request location consent
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = '2af9a920116ca475844769db464e816a'; // Replace with your OpenWeatherMap API key
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const temperature = Math.round(data.main.temp);
                    currentTemperatureC = temperature;
                    const feelslike = Math.round(data.main.feels_like);
                    currentFeelsLike = feelslike;
                    const location = data.name;
                    const weatherCondition = data.weather[0].main.toLowerCase();

                    const countryCode = data.sys.country;
                    const countryName = getCountryNameByCode(countryCode);

                    const windspeed = data.wind.speed;
                    const visibility = (data.visibility/1000);
                    const sunrise = new Date((data.sys.sunrise)*1000);
                    const sunset = new Date((data.sys.sunset)*1000);
                    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
                    const formattedSunrise = sunrise.toLocaleTimeString([], options);
                    const formattedSunset = sunset.toLocaleTimeString([], options); 


                    

                    
                    // Update the temperature and location in the UI
                    document.getElementById("temperature").textContent = `${temperature}°`;
                    document.getElementById("feelslike").textContent = `Feels Like ${feelslike}°`;
                    document.getElementById("windspeed").textContent = `Wind Speed: ${windspeed} m/s`;
                    document.getElementById("visibility").textContent=`Visibility: ${visibility} km`;
                    document.getElementById("sunrise").textContent=`Sunrise: ${formattedSunrise}`;
                    document.getElementById("sunset").textContent=`Sunset: ${formattedSunset}`;
                    document.getElementById("location").textContent=`${location},`;
                    document.getElementById("country").textContent=`${countryName}`;
                    // Set the image based on the weather condition
                    const weatherImage = document.getElementById("weatherImage");
                    const defaults = ["default-1.jpg", "default-2.jpg", "default-3.jpg", "default-4.jpg"]
                    const randomIndex = Math.floor(Math.random() * defaults.length);
                    weatherImage.src= defaults[randomIndex];
                    const weatherIcon = document.getElementById("weatherIcon")
                    switch (weatherCondition) {
                        case 'clear':
                            
                            weatherIcon.src = 'clear.png' // Add path to sunny image
                            break;
                        case 'clouds':
                            
                            weatherIcon.src = 'cloudy.png' // Add path to cloudy image
                            break;
                        case 'rain':
                            
                            weatherIcon.src = 'rainy.png' // Add path to rainy image
                            break;
                        case 'snow':
                             
                            weatherIcon.src = 'snowy.png' // Add path to snowy image
                            break;
                        default:
                           
                            weatherIcon.src = 'clear.png' // Add a default image
                    }
                })
                .catch(error => console.log('Error:', error));

                fetch(forecastUrl)
                .then(response => response.json())
                .then(data => {
                    const forecastContainer = document.getElementById('forecast');
                    forecastContainer.innerHTML = ''; // Clear previous forecast

                    // Get the forecast data for the next 5 days
                    for (let i = 0; i < 5; i++) {
                        const forecastDay = data.list[i * 8]; // Each day has 8 entries in the forecast
                        const date = new Date(forecastDay.dt * 1000)
                        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        const dayIndex = date.getDay();
                        const dayName = daysOfWeek[dayIndex];
                        const temp = Math.round(forecastDay.main.temp); // Get temperature
                        const condition = (forecastDay.weather[0].description).replace(/\b\w/g, char =>char.toUpperCase()); // Get weather condition

                        // Create a forecast item
                        const forecastItem = document.createElement('div');
                        forecastItem.classList.add('forecast-item');
                        forecastItem.innerHTML = `<strong>${dayName}</strong><br>${temp}°C<br>${condition}`;
                        forecastContainer.appendChild(forecastItem);
                    }
                }).catch(error => console.log('Error:', error));
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function updateDateTime() {
    const now = new Date();
    
    // Get day, month, year
    const day = now.getDate();
    const month = now.toLocaleString('default', { month: 'long' }); // 'January', 'February', etc.
    const year = now.getFullYear();
    
    // Get hours, minutes, seconds
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // Format hours, minutes, seconds to have leading zeros
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    // Display format: Day Month Year, HH:MM:SS
    const formattedDateTime = `${day} ${month}, ${year}  ${hours}:${minutes}`;
    
    // Update the HTML element
    document.getElementById('DateTime').textContent = formattedDateTime;
}

// Update date and time every second
setInterval(updateDateTime, 1000);

// Function to convert Celsius to Fahrenheit
function celsiusToFahrenheit(tempC) {
    return Math.round((tempC * 9/5) + 32);
}

// Function to update the displayed temperature and button colors
function updateTemperatureDisplay() {
    const temperatureElement = document.getElementById("temperature");
    
    const celsiusButton = document.querySelector('.btn1');
    const fahrenheitButton = document.querySelector('.btn2');

    if (isCelsius) {
        temperatureElement.textContent = `${currentTemperatureC}`+"°";
        document.getElementById("feelslike").textContent = `Feels Like ${currentFeelsLike}°`;
        celsiusButton.style.color = 'white';
        fahrenheitButton.style.color = 'gray'; // Reset to default
    } else {
        const tempF1 = celsiusToFahrenheit(currentTemperatureC);
        const tempF2 = celsiusToFahrenheit(currentFeelsLike)
        temperatureElement.textContent = `${tempF1}`+'°';
        document.getElementById("feelslike").textContent = `Feels Like ${tempF2}°`;
        fahrenheitButton.style.color = 'white';
        celsiusButton.style.color = 'gray'; // Reset to default
    }
}

// Event listeners for the buttons
document.querySelector('.btn1').addEventListener('click', () => {
    isCelsius = true;
    updateTemperatureDisplay();
});

document.querySelector('.btn2').addEventListener('click', () => {
    isCelsius = false;
    updateTemperatureDisplay();
});

// Call the function on page load
window.onload = getWeather,updateDateTime;
