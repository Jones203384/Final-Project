# Campus Life Super App

## Project Description and Purpose

The Campus Life Super App is a web application designed to address common pain points in college life through a unified interface. It brings together multiple features to help students manage their daily activities, stay informed, and connect with the community. This project showcases web development skills including HTML, CSS, Bootstrap, JavaScript, API integrations, and responsive design.

## Technologies Used

- **HTML5**: Semantic structure for web pages
- **CSS3**: Custom styling with responsive design
- **Bootstrap 5**: Framework for responsive components and layout
- **JavaScript (ES6+)**: Interactive functionality and API integrations
- **APIs**:
  - OpenWeatherMap API for campus weather information
  - NewsAPI for campus news and announcements
  - Google Maps API for campus navigation
- **GitHub Pages**: For deployment

## Setup and Deployment Instructions

### Prerequisites
- A web browser
- Internet connection for API calls
- API keys for OpenWeatherMap, NewsAPI, and Google Maps (see below)

### Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/campus-life-super-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd campus-life-super-app
   ```
3. Open `index.html` in your web browser.

### API Keys Setup
1. Sign up for free accounts at:
   - [OpenWeatherMap](https://openweathermap.org/api)
   - [NewsAPI](https://newsapi.org/)
   - [Google Maps Platform](https://developers.google.com/maps)
2. Obtain your API keys
3. In the JavaScript files, replace the placeholder `YOUR_API_KEY` with your actual keys:
   - `js/weather.js`: Replace `YOUR_OPENWEATHER_API_KEY`
   - `js/news.js`: Replace `YOUR_NEWS_API_KEY`
   - `js/map.js`: Replace `YOUR_GOOGLE_MAPS_API_KEY`

### Deployment
The project is deployed on GitHub Pages. To deploy your own version:
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select the main branch as source
4. The site will be available at `https://yourusername.github.io/repository-name/`

## Feature List and How to Use Them

### 1. Home Page
- Overview of the app with navigation to all features
- Quick access to weather, latest news, and campus map

### 2. Campus Weather
- Displays current weather conditions for the campus location
- Shows temperature, humidity, wind speed, and weather description
- How to use: Navigate to the Weather page; the data loads automatically

### 3. Campus News
- Fetches and displays latest news and announcements
- Filter by categories like events, academics, sports
- How to use: Go to the News page; browse articles and click to read more

### 4. Campus Map
- Interactive map showing campus locations
- Search for buildings, parking, dining halls
- How to use: Visit the Map page; use the search bar or click on map markers

### 5. Dining Information
- Menu suggestions and dining hall hours
- Nutritional information for meals
- How to use: Check the Dining page for current menus and hours

## Future Improvements or Stretch Goals

- User authentication for personalized features
- Real-time event notifications
- Integration with campus calendar systems
- Social features for student interactions
- Offline functionality with service workers
- Mobile app version using React Native
- Advanced search and filtering options
- Campus directory integration