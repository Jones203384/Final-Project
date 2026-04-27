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
  - Spoonacular API for recipe suggestions
- **GitHub Pages**: For deployment

## Technical Requirements Met

✅ **Three or more HTML pages using semantic HTML** - 7 pages with proper semantic structure  
✅ **Custom CSS with responsive design** - Custom styles with media queries for all screen sizes  
✅ **Bootstrap integration** - Bootstrap 5 for consistent design and responsive components  
✅ **JavaScript interactivity** - Event-driven programming with search, filtering, modals, and API calls  
✅ **External API integration** - 4 live APIs providing dynamic content (weather, news, maps, recipes)  
✅ **Accessibility features** - Semantic headings, alt text, keyboard navigation, ARIA labels  
✅ **Responsive layout** - Works across desktop, tablet, and mobile devices  
✅ **GitHub Pages deployment** - Live deployment at https://jones203384.github.io/Final-Project/

## Project Structure

```
Final-Project/
├── index.html                 # Home page with featured content
├── events.html               # Events page with search/filter
├── dining.html               # Dining page with recipes and hours
├── student-resources.html    # Resources page with categories
├── weather.html              # Weather page with live data
├── news.html                 # News page with articles
├── map.html                  # Interactive campus map
├── README.md                 # Project documentation
├── assets/                   # Static assets (currently empty)
├── css/
│   └── style.css            # Custom CSS styles
└── js/
    ├── app.js               # Core utilities and shared functions
    ├── home.js              # Home page functionality
    ├── events.js            # Events page with search/filter
    ├── dining.js            # Dining page with API integration
    ├── student-resources.js # Resources page functionality
    ├── weather.js           # Weather API integration
    ├── news.js              # News API integration
    └── map.js               # Google Maps integration
```

## Code Quality & Documentation

- **Extensive Comments**: All JavaScript files include detailed JSDoc-style comments explaining function purposes, parameters, and usage
- **Semantic HTML**: Proper use of semantic elements (header, nav, main, section, footer) for accessibility
- **Error Handling**: Comprehensive error handling for API calls with user-friendly messages
- **Responsive Design**: Mobile-first approach with Bootstrap grid system and custom media queries
- **Accessibility**: Keyboard navigation, screen reader support, and proper ARIA labels
- **Performance**: Optimized API calls, image lazy loading, and efficient DOM manipulation

## Setup and Deployment Instructions

### Prerequisites
- A web browser
- Internet connection for API calls
- API keys for OpenWeatherMap, NewsAPI, and Google Maps (see below)

### Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Jones203384/Final-Project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Final-Project
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
4. The site will be available at `https://jones203384.github.io/Final-Project/`

## Feature List and How to Use Them

### 1. Home Page
- **Overview**: Welcome page with quick links and featured content
- **Features**: Hero section, quick navigation buttons, featured events preview, dining snapshot, recent announcements
- **How to use**: Start here to access all app features via quick links

### 2. Events Page
- **Overview**: Browse and RSVP to campus events
- **Features**: Search/filter by category, event cards with details, RSVP modal, real-time filtering
- **How to use**: Use search bar or category filters to find events, click "View Details" to RSVP

### 3. Dining Page
- **Overview**: Campus dining information and meal ideas
- **Features**: Dining hours, meal plans, favorites, random recipe generator via Spoonacular API
- **How to use**: View hours and meal plans, click "Get Random Recipe" for meal suggestions

### 4. Student Resources Page
- **Overview**: Essential campus resources and information
- **Features**: Resource categories, search functionality, alerts/announcements, contact information
- **How to use**: Browse categories or use search to find specific resources

### 5. Weather Page
- **Overview**: Live campus weather information
- **Features**: Current temperature, humidity, wind speed, weather icons via OpenWeatherMap API
- **How to use**: Automatically loads weather data for College Station, TX

### 6. News Page
- **Overview**: Latest education and campus news
- **Features**: Live news articles, images, publication dates via NewsAPI
- **How to use**: Browse articles, click "Read More" for full stories

### 7. Map Page
- **Overview**: Interactive campus map with location markers
- **Features**: Google Maps integration, campus building markers, info windows
- **How to use**: Click on map markers for location details

## Problems Encountered & Areas for Improvement

### Problems Encountered:
- **Missing image assets** - `assets/placeholder.jpg` referenced in code didn't exist, causing broken images
- **API key configuration** - Required manual setup of 4 API keys (OpenWeatherMap, NewsAPI, Spoonacular, Google Maps)
- **Image loading failures** - No error handling for failed API image requests
- **Limited error recovery** - Basic error messages without user guidance

### Areas for Improvement:
- **Performance**: Implement caching and progressive loading for better user experience
- **Error Handling**: Add retry mechanisms and better user feedback for API failures
- **Offline Functionality**: Service worker for core features when offline
- **Mobile Experience**: Enhanced touch gestures and mobile-specific optimizations
- **Accessibility**: Further improvements for screen readers and keyboard navigation
- **Security**: Environment variables for API key management
- **Testing**: Unit tests and E2E testing for critical functionality

## Campus App Wireframe Navigation SOP

### Home Page Flow
- Start: Open App
- Land on the Home Page
- Display Header/Logo and Top Navigation with global links
- Show Hero/Welcome area with image and text
- Present Quick Links buttons
- Show Featured Events Preview cards
- Display Dining Snapshot placeholder and Announcements
- Show Footer
- From Home, users can navigate to the Events Page, Dining Page, or Student Resources Page

### Events Page Flow
- Show Header/Logo and Top Navigation
- Display Search/Filter Bar and Event Cards List
- Selecting an event opens an Event Detail Preview/Modal with RSVP/Action Buttons
- Show Footer
- Users can return Home or move to other pages through global navigation

### Dining Page Flow
- Show Header/Logo and Top Navigation
- Display Dining Hall Status/Hours and Menu/API placeholder
- Show Favorites/Meal Plan section and Map/Location placeholder
- Show Footer
- Users can navigate to Home, Events, or Resources through global navigation

### Student Resources Page Flow
- Show Header/Logo and Top Navigation
- Display Search and Categories Grid
- Show Helpful Links/Cards and Alerts/Updates area
- Show Footer
- Users can navigate to other pages through global navigation

### Global Navigation Behavior
- Each page includes links to Home, Events, Dining, and Student Resources
- Users can move between pages without returning to Home first
- End: Exit the app

## Future Improvements or Stretch Goals

- User authentication for personalized features
- Real-time event notifications
- Integration with campus calendar systems
- Social features for student interactions
- Offline functionality with service workers
- Mobile app version using React Native
- Advanced search and filtering options
- Campus directory integration