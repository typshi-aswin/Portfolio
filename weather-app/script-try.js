let isCelsius = true; // Track if the current temperature is in Celsius
let currentTemperatureC = 30; // Variable to store the Celsius temperature
let currentFeelsLike = 35;
function getWeather() {
    document.getElementById("temperature").textContent = `30°`;
    document.getElementById("location").textContent = `Trivandrum,`;
    document.getElementById("country").textContent =`INDIA`;
    document.getElementById("feelslike").textContent = 'Feels Like 35°';
    const weatherImage = document.getElementById("weatherImage");
    const weatherIcon = document.getElementById("weatherIcon")
    weatherIcon.src = 'clear.png';
    const defaults = ["default-1.jpg", "default-2.jpg", "default-3.jpg", "default-4.jpg"]
    const randomIndex = Math.floor(Math.random() * defaults.length);
    weatherImage.src= defaults[randomIndex];
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
        const tempF2 = celsiusToFahrenheit(currentFeelsLike);
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


window.onload = getWeather, updateDateTime;