// Weather API integration for Campus Life Super App

const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your actual API key
const CITY = 'College Station'; // Replace with your campus city
const UNITS = 'imperial'; // Use 'metric' for Celsius

// Function to fetch weather data
async function fetchWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=${UNITS}`;

    try {
        showLoading('weather-content');
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayError('Unable to load weather data. Please check your API key and try again.');
    } finally {
        hideLoading('weather-content');
    }
}

// Function to display weather data
function displayWeather(data) {
    const weatherContent = document.getElementById('weather-content');
    const { main, weather, wind } = data;

    const temperature = Math.round(main.temp);
    const description = weather[0].description;
    const humidity = main.humidity;
    const windSpeed = Math.round(wind.speed);

    weatherContent.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h3>${temperature}°F</h3>
                <p class="text-capitalize">${description}</p>
            </div>
            <div class="col-md-6">
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} mph</p>
            </div>
        </div>
        <div class="mt-3">
            <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${description}" class="img-fluid">
        </div>
    `;
}

// Function to display error message
function displayError(message) {
    const weatherContent = document.getElementById('weather-content');
    weatherContent.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Error</h4>
            <p>${message}</p>
        </div>
    `;
}

// Load weather data when page loads
document.addEventListener('DOMContentLoaded', fetchWeather);