/**
 * Weather API Integration
 * Purpose: Fetch and display real-time campus weather data from OpenWeatherMap API
 * API: OpenWeatherMap (https://openweathermap.org/api)
 * Features: Current temperature, humidity, wind speed, weather icon, error handling
 */

// ===== API CONFIGURATION =====
// Replace YOUR_OPENWEATHER_API_KEY with your actual API key from OpenWeatherMap
const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
const CITY = 'College Station'; // Change to your campus city
const UNITS = 'imperial'; // Use 'metric' for Celsius, 'imperial' for Fahrenheit

// ===== FETCH WEATHER DATA FROM API =====
// Purpose: Make async request to OpenWeatherMap API and handle response
// Flow: Display loading spinner → Fetch data → Display or show error
async function fetchWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=${UNITS}`;

    try {
        showLoading('weather-content');
        
        // API request with error checking
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse JSON response and display weather data
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayError('Unable to load weather data. Please check your API key and try again.');
    } finally {
        hideLoading('weather-content');
    }
}

// ===== DISPLAY WEATHER INFORMATION =====
// Purpose: Format and render weather data to the DOM
// Extracts: Temperature, description, humidity, wind speed, and weather icon
function displayWeather(data) {
    const weatherContent = document.getElementById('weather-content');
    const { main, weather, wind } = data;

    // Extract weather metrics from API response
    const temperature = Math.round(main.temp);
    const description = weather[0].description;
    const humidity = main.humidity;
    const windSpeed = Math.round(wind.speed);

    // Render weather data with OpenWeatherMap icon
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
            <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${description} weather icon" class="img-fluid">
        </div>
    `;
}

// ===== ERROR HANDLING =====
// Purpose: Display user-friendly error messages when API fails or is misconfigured
function displayError(message) {
    const weatherContent = document.getElementById('weather-content');
    weatherContent.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Error</h4>
            <p>${message}</p>
        </div>
    `;
}

// ===== AUTO-LOAD ON PAGE LOAD =====
// Purpose: Automatically fetch and display weather when Weather page loads
document.addEventListener('DOMContentLoaded', fetchWeather);