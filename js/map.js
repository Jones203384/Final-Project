/**
 * Google Maps API Integration
 * Purpose: Display interactive campus map with location markers for key campus buildings
 * API: Google Maps JavaScript API (https://developers.google.com/maps/documentation/javascript)
 * Features: Map initialization, markers with info windows, location data
 */

// ===== GLOBAL MAP VARIABLE =====
// Stores reference to the map object for use across functions
let map;

// ===== INITIALIZE GOOGLE MAP =====
// Purpose: Create map instance, set center/zoom, add markers with info windows
// Called after Google Maps API script loads
function initMap() {
    // Center campus location - example uses Texas A&M University coordinates
    // Update these coordinates to your campus location
    const campusLocation = { lat: 30.6187, lng: -96.3365 };

    // Create map instance centered on campus
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: campusLocation,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // ===== CAMPUS LOCATION MARKERS =====
    // Purpose: Define key campus buildings/facilities with coordinates and titles
    // Each marker has an info window that displays on click
    const locations = [
        { position: { lat: 30.6187, lng: -96.3365 }, title: 'Main Campus' },
        { position: { lat: 30.6200, lng: -96.3400 }, title: 'Library' },
        { position: { lat: 30.6150, lng: -96.3350 }, title: 'Student Center' },
        { position: { lat: 30.6220, lng: -96.3380 }, title: 'Dining Hall' },
        { position: { lat: 30.6160, lng: -96.3420 }, title: 'Gym' }
    ];

    // ===== CREATE AND ADD MARKERS =====
    // Purpose: Loop through locations and create Google Maps markers with click handlers
    locations.forEach(location => {
        // Create marker at specified position
        const marker = new google.maps.Marker({
            position: location.position,
            map: map,
            title: location.title
        });

        // Create info window with location title
        const infoWindow = new google.maps.InfoWindow({
            content: `<h5>${location.title}</h5><p>Click for more info</p>`
        });

        // Open info window when marker is clicked
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// ===== ERROR HANDLING =====
// Purpose: Display error message if Google Maps API fails to load
// This occurs if API key is invalid or internet connection fails
window.addEventListener('load', function() {
    if (typeof google === 'undefined') {
        document.getElementById('map').innerHTML = '<div class="alert alert-warning">Unable to load map. Please check your Google Maps API key.</div>';
    }
});