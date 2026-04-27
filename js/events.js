/**
 * Events Management
 * Purpose: Display, search, filter, and manage campus events
 * Features: Event data storage, search functionality, category filtering, modal details, RSVP
 */

// ===== STATIC EVENTS DATA =====
// Purpose: Local data storage for events (placeholder for future API/database integration)
// Each event contains: id, title, category, date, time, location, description, rsvp status
const eventsData = [
    {
        id: 1,
        title: 'Welcome Week Kickoff',
        category: 'social',
        date: '2024-08-25',
        time: '16:00',
        location: 'Main Quad',
        description: 'Join us for the exciting start of the semester! Enjoy games, free food, live music, and meet your fellow students.',
        rsvp: false
    },
    {
        id: 2,
        title: 'Career Fair',
        category: 'career',
        date: '2024-09-10',
        time: '10:00',
        location: 'Student Center Ballroom',
        description: 'Network with leading companies and discover internship and job opportunities in your field.',
        rsvp: false
    },
    {
        id: 3,
        title: 'Homecoming Game',
        category: 'sports',
        date: '2024-10-15',
        time: '19:00',
        location: 'Kyle Field',
        description: 'Celebrate tradition and school spirit at our annual homecoming football game!',
        rsvp: false
    },
    {
        id: 4,
        title: 'Guest Lecture: AI in Education',
        category: 'academic',
        date: '2024-09-20',
        time: '14:00',
        location: 'Lecture Hall 101',
        description: 'Learn about the latest developments in artificial intelligence and its applications in education.',
        rsvp: false
    },
    {
        id: 5,
        title: 'Student Club Fair',
        category: 'social',
        date: '2024-08-30',
        time: '11:00',
        location: 'Campus Green',
        description: 'Discover student clubs and organizations that match your interests.',
        rsvp: false
    }
];

// ===== DISPLAY EVENTS ON PAGE =====
// Purpose: Render event cards in grid layout with Bootstrap cards
// Creates clickable event cards with details button for modal interaction
function displayEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';

    // Handle no results case
    if (events.length === 0) {
        eventsContainer.innerHTML = '<div class="col-12"><p class="text-center">No events found.</p></div>';
        return;
    }

    // Create card for each event
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'col-md-6 col-lg-4 mb-4';
        eventElement.innerHTML = `
            <div class="card h-100">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text">${event.description}</p>
                    <p class="text-muted">Date: ${new Date(event.date).toLocaleDateString()} | Time: ${event.time}</p>
                    <p class="text-muted">Location: ${event.location}</p>
                    <button class="btn btn-primary mt-auto" onclick="showEventDetails(${event.id})">Learn More</button>
                </div>
            </div>
        `;
        eventsContainer.appendChild(eventElement);
    });
}

// ===== SHOW EVENT DETAILS IN MODAL =====
// Purpose: Display full event information in Bootstrap modal when user clicks "Learn More"
// Features: Title, description, date/time, location, category
function showEventDetails(eventId) {
    // Find event by ID in events array
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;

    // Populate modal with event data
    const modal = new bootstrap.Modal(document.getElementById('eventDetailModal'));
    document.getElementById('eventDetailModalLabel').textContent = event.title;
    document.getElementById('event-detail-content').innerHTML = `
        <p><strong>Description:</strong> ${event.description}</p>
        <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Category:</strong> ${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</p>
    `;
    modal.show();
}

// ===== FILTER EVENTS =====
// Purpose: Filter events based on search term and category selection
// Logic: Combined filtering - match search AND category
function filterEvents() {
    // Get filter values from input elements
    const searchTerm = document.getElementById('event-search').value.toLowerCase();
    const category = document.getElementById('event-category').value;

    // Filter events that match both search term and category
    const filteredEvents = eventsData.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) || 
                             event.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || event.category === category;
        return matchesSearch && matchesCategory;
    });

    // Display filtered results
    displayEvents(filteredEvents);
}

// ===== EVENT LISTENERS FOR SEARCH AND FILTER =====
// Purpose: Attach handlers for real-time search and filter functionality
// Features: Live search as user types, filter button click, category selection
document.addEventListener('DOMContentLoaded', function() {
    // Display all events initially
    displayEvents(eventsData);

    // Search input event listener - filters as user types
    document.getElementById('event-search').addEventListener('input', filterEvents);

    // Filter button event listener
    document.getElementById('filter-events-btn').addEventListener('click', filterEvents);

    // Category select event listener - filters when category changes
    document.getElementById('event-category').addEventListener('change', filterEvents);
});