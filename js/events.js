// Events page JavaScript for Campus Life Super App

// Static events data (placeholder for future API integration)
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

// Function to display events
function displayEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';

    if (events.length === 0) {
        eventsContainer.innerHTML = '<div class="col-12"><p class="text-center">No events found.</p></div>';
        return;
    }

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

// Function to show event details in modal
function showEventDetails(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;

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

// Function to filter events based on search and category
function filterEvents() {
    const searchTerm = document.getElementById('event-search').value.toLowerCase();
    const category = document.getElementById('event-category').value;

    const filteredEvents = eventsData.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) || 
                             event.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || event.category === category;
        return matchesSearch && matchesCategory;
    });

    displayEvents(filteredEvents);
}

// Event listeners for search and filter
document.addEventListener('DOMContentLoaded', function() {
    // Display all events initially
    displayEvents(eventsData);

    // Search input event listener
    document.getElementById('event-search').addEventListener('input', filterEvents);

    // Filter button event listener
    document.getElementById('filter-events-btn').addEventListener('click', filterEvents);

    // Category select event listener
    document.getElementById('event-category').addEventListener('change', filterEvents);
});