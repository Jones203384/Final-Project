// Google Maps integration for Campus Life Super App

let map;

function initMap() {
    // Center the map on a sample campus location (e.g., Texas A&M University)
    const campusLocation = { lat: 30.6187, lng: -96.3365 };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: campusLocation,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // Add markers for campus locations
    const locations = [
        { position: { lat: 30.6187, lng: -96.3365 }, title: 'Main Campus' },
        { position: { lat: 30.6200, lng: -96.3400 }, title: 'Library' },
        { position: { lat: 30.6150, lng: -96.3350 }, title: 'Student Center' },
        { position: { lat: 30.6220, lng: -96.3380 }, title: 'Dining Hall' },
        { position: { lat: 30.6160, lng: -96.3420 }, title: 'Gym' }
    ];

    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: location.position,
            map: map,
            title: location.title
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `<h5>${location.title}</h5><p>Click for more info</p>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Error handling for map loading
window.addEventListener('load', function() {
    if (typeof google === 'undefined') {
        document.getElementById('map').innerHTML = '<div class="alert alert-warning">Unable to load map. Please check your Google Maps API key.</div>';
    }
});