/**
 * Events Page Functionality
 * Purpose: Manage event display, search/filter, and RSVP modal functionality
 * Features: Event listing, dynamic search filtering, category filtering, modal interactions
 * Pattern: Event-driven programming using DOM event listeners
 */

// ===== MOCK EVENT DATA =====
// Purpose: Simulate event data from an API (future enhancement: replace with real API)
// Structure: Array of event objects with all necessary information for display and filtering
const eventsData = [
    {
        id: 1,
        title: 'Welcome Week Kickoff',
        category: 'social',
        date: '2026-05-01',
        time: '6:00 PM',
        location: 'Student Center',
        description: 'Join us for the annual Welcome Week celebration featuring live music, food trucks, and activities. Meet new students and staff!',
        attendees: 250
    },
    {
        id: 2,
        title: 'Chemistry Lab Workshop',
        category: 'academic',
        date: '2026-04-28',
        time: '3:00 PM',
        location: 'Science Building',
        description: 'Learn advanced laboratory techniques in our state-of-the-art chemistry lab. Bring your notebook and lab coat.',
        attendees: 45
    },
    {
        id: 3,
        title: 'Campus Sports Tournament',
        category: 'sports',
        date: '2026-05-05',
        time: '10:00 AM',
        location: 'Athletic Complex',
        description: 'Participate in various sports activities including basketball, soccer, and volleyball. Teams needed!',
        attendees: 180
    },
    {
        id: 4,
        title: 'Cultural Festival 2026',
        category: 'cultural',
        date: '2026-05-10',
        time: '4:00 PM',
        location: 'Campus Lawn',
        description: 'Celebrate diversity through international food, music, dance, and art from around the world.',
        attendees: 500
    },
    {
        id: 5,
        title: 'Job Fair 2026',
        category: 'academic',
        date: '2026-05-12',
        time: '9:00 AM',
        location: 'Career Center',
        description: 'Connect with top employers and explore internship and full-time job opportunities. Bring your resume!',
        attendees: 300
    },
    {
        id: 6,
        title: 'Volleyball Match - Home vs Rivals',
        category: 'sports',
        date: '2026-05-08',
        time: '7:00 PM',
        location: 'Sports Arena',
        description: 'Cheer on our volleyball team as they face off against our biggest rivals. Free admission for students!',
        attendees: 800
    }
];

// ===== GLOBAL VARIABLES FOR STATE MANAGEMENT =====
// Purpose: Keep track of current filters and selected event for modal
let currentSearchTerm = '';
let currentCategory = '';
let selectedEvent = null;

// ===== DISPLAY ALL EVENTS =====
// Purpose: Render event cards to DOM based on current filters
// Filters: Search term and category selection
function displayEvents(eventsToDisplay = eventsData) {
    const container = document.getElementById('events-container');
    container.innerHTML = ''; // Clear existing content

    // Filter events based on search term and category
    const filtered = eventsToDisplay.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                            event.description.toLowerCase().includes(currentSearchTerm.toLowerCase());
        const matchesCategory = currentCategory === '' || event.category === currentCategory;
        return matchesSearch && matchesCategory;
    });

    // Display message if no events match filters
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info" role="alert">
                    <h4 class="alert-heading">No Events Found</h4>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            </div>
        `;
        return;
    }

    // Create and display event card for each filtered event
    filtered.forEach(event => {
        const eventCard = createEventCard(event);
        container.appendChild(eventCard);
    });
}

// ===== CREATE EVENT CARD ELEMENT =====
// Purpose: Build a Bootstrap card element for a single event
// Returns: DOM element ready to be appended to container
// Features: Event title, date, time, location, description preview, attendee count, click handler
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4 mb-4';
    
    // Format date for display
    const eventDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    // Build card HTML with event information
    card.innerHTML = `
        <div class="card h-100 event-card" data-event-id="${event.id}" role="button" tabindex="0">
            <div class="card-body d-flex flex-column">
                <span class="badge bg-info mb-2" style="width: fit-content;">${event.category}</span>
                <h5 class="card-title">${event.title}</h5>
                <p class="card-text text-muted mb-3">${event.description.substring(0, 100)}...</p>
                
                <div class="event-info mb-3">
                    <p class="mb-1"><strong>📅 Date:</strong> ${eventDate}</p>
                    <p class="mb-1"><strong>🕐 Time:</strong> ${event.time}</p>
                    <p class="mb-1"><strong>📍 Location:</strong> ${event.location}</p>
                    <p class="mb-0"><strong>👥 Attendees:</strong> ${event.attendees}</p>
                </div>
            </div>
            <div class="card-footer bg-light">
                <button class="btn btn-primary btn-sm w-100">View Details</button>
            </div>
        </div>
    `;

    // EVENT LISTENER: Handle card click to open modal
    // Purpose: Allow users to click on any part of the card to see event details
    card.addEventListener('click', () => showEventModal(event));
    
    // KEYBOARD ACCESSIBILITY: Handle Enter/Space keys on card
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showEventModal(event);
        }
    });

    return card;
}

// ===== SHOW EVENT DETAIL MODAL =====
// Purpose: Display modal with full event information and RSVP button
// Parameters: Event object to display
function showEventModal(event) {
    selectedEvent = event;
    
    // Format date for display in modal
    const eventDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Build detailed event information for modal body
    const modalBody = document.getElementById('modal-body-content');
    modalBody.innerHTML = `
        <h5>${event.title}</h5>
        <div class="mb-3">
            <span class="badge bg-info">${event.category}</span>
        </div>
        <p><strong>Date:</strong> ${eventDate}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Expected Attendees:</strong> ${event.attendees}</p>
        <hr>
        <p>${event.description}</p>
    `;

    // Update modal title
    document.getElementById('eventDetailLabel').textContent = event.title;

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('eventDetailModal'));
    modal.show();
}

// ===== SEARCH FUNCTIONALITY =====
// Purpose: Filter events based on user search input
// Event-driven: Triggered on search button click or input change
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('event-search');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const rsvpBtn = document.getElementById('rsvp-btn');

    // EVENT LISTENER: Search button click
    searchBtn.addEventListener('click', () => {
        currentSearchTerm = searchInput.value;
        displayEvents();
    });

    // EVENT LISTENER: Real-time search as user types
    searchInput.addEventListener('keyup', () => {
        currentSearchTerm = searchInput.value;
        displayEvents();
    });

    // EVENT LISTENER: Category filter dropdown change
    categoryFilter.addEventListener('change', (e) => {
        currentCategory = e.target.value;
        displayEvents();
    });

    // EVENT LISTENER: RSVP button click
    rsvpBtn.addEventListener('click', () => {
        if (selectedEvent) {
            // Show user feedback for RSVP action
            alert(`✓ You have successfully RSVP'd to "${selectedEvent.title}"!\nCheck your email for confirmation details.`);
            
            // Close modal after RSVP
            const modal = bootstrap.Modal.getInstance(document.getElementById('eventDetailModal'));
            modal.hide();
        }
    });

    // Initial display of all events on page load
    displayEvents();
});
