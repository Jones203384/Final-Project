/**
 * Home Page Functionality
 * Purpose: Load and display featured events and announcements on the home page
 * Features: Dynamic content loading, announcements display
 * Pattern: Event-driven programming for page initialization
 */

// ===== MOCK DATA FOR HOME PAGE =====
// Purpose: Provide sample featured events and announcements
// Future: Replace with API calls to backend

const homePageData = {
    featuredEvents: [
        {
            id: 1,
            title: 'Welcome Week Kickoff',
            date: '2026-05-01',
            time: '6:00 PM',
            location: 'Student Center',
            attendees: 250
        },
        {
            id: 4,
            title: 'Cultural Festival 2026',
            date: '2026-05-10',
            time: '4:00 PM',
            location: 'Campus Lawn',
            attendees: 500
        },
        {
            id: 5,
            title: 'Job Fair 2026',
            date: '2026-05-12',
            time: '9:00 AM',
            location: 'Career Center',
            attendees: 300
        }
    ],
    announcements: [
        {
            id: 1,
            title: 'Spring Semester Registration Extended',
            message: 'Registration deadline has been extended to May 15th for all students.',
            type: 'info'
        },
        {
            id: 2,
            title: 'Library Maintenance Tomorrow',
            message: 'The library will be closed from 8 AM - 12 PM tomorrow for system upgrades.',
            type: 'warning'
        },
        {
            id: 3,
            title: 'Campus Parking Updates',
            message: 'New student parking lot now available near the athletic complex.',
            type: 'success'
        }
    ]
};

// ===== LOAD PAGE CONTENT ON INITIALIZATION =====
// Purpose: Display featured events and announcements when home page loads
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedEvents();
    displayAnnouncements();
});

// ===== DISPLAY FEATURED EVENTS =====
// Purpose: Show preview cards for 3 upcoming featured events
// Features: Event title, date, time, location, attendee count
function displayFeaturedEvents() {
    const container = document.getElementById('featured-events-container');
    container.innerHTML = '';

    // Create card for each featured event
    homePageData.featuredEvents.forEach(event => {
        // Format date for display
        const eventDate = new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        const eventCard = document.createElement('div');
        eventCard.className = 'col-md-4 mb-3';
        
        eventCard.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text">
                        <small>
                            <strong>📅</strong> ${eventDate}<br>
                            <strong>🕐</strong> ${event.time}<br>
                            <strong>📍</strong> ${event.location}<br>
                            <strong>👥</strong> ${event.attendees} attending
                        </small>
                    </p>
                </div>
                <div class="card-footer bg-light">
                    <a href="events.html" class="btn btn-sm btn-primary w-100">View Details</a>
                </div>
            </div>
        `;

        container.appendChild(eventCard);
    });
}

// ===== DISPLAY ANNOUNCEMENTS =====
// Purpose: Show important campus announcements to users
// Features: Dismissible alert cards with announcement content
function displayAnnouncements() {
    const container = document.getElementById('announcements-container');
    container.innerHTML = '';

    // Create alert element for each announcement
    homePageData.announcements.forEach(announcement => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${announcement.type} alert-dismissible fade show mb-3`;
        alertElement.role = 'alert';

        alertElement.innerHTML = `
            <h5 class="alert-heading">${announcement.title}</h5>
            <p class="mb-0">${announcement.message}</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        container.appendChild(alertElement);
    });
}
