/**
 * Student Resources Page Functionality
 * Purpose: Display student resources, handle search filtering, and manage alerts
 * Features: Resource categorization, search functionality, alerts/announcements
 * Pattern: Event-driven programming using DOM event listeners
 */

// ===== MOCK RESOURCE DATA =====
// Purpose: Simulate resource data (future enhancement: replace with real database)
// Structure: Resources organized by category with descriptions and links

const resourcesData = {
    alerts: [
        {
            id: 1,
            title: 'Spring Semester Registration Extended',
            message: 'Registration deadline has been extended to May 15th for all students.',
            type: 'info',
            date: '2026-04-27'
        },
        {
            id: 2,
            title: 'Library Maintenance Tomorrow',
            message: 'The library will be closed from 8 AM - 12 PM tomorrow for system upgrades.',
            type: 'warning',
            date: '2026-04-26'
        },
        {
            id: 3,
            title: 'Campus Parking Updates',
            message: 'New student parking lot now available near the athletic complex.',
            type: 'success',
            date: '2026-04-25'
        }
    ],
    categories: [
        {
            id: 1,
            name: 'Academic Support',
            icon: '📚',
            color: 'primary',
            count: 8
        },
        {
            id: 2,
            name: 'Health & Wellness',
            icon: '💪',
            color: 'success',
            count: 6
        },
        {
            id: 3,
            name: 'Career Services',
            icon: '💼',
            color: 'info',
            count: 5
        },
        {
            id: 4,
            name: 'Housing & Residential',
            icon: '🏠',
            color: 'warning',
            count: 4
        },
        {
            id: 5,
            name: 'Financial Aid',
            icon: '💰',
            color: 'danger',
            count: 7
        },
        {
            id: 6,
            name: 'Technology Support',
            icon: '💻',
            color: 'secondary',
            count: 5
        }
    ],
    resources: [
        {
            id: 1,
            title: 'Writing Center',
            category: 'Academic Support',
            description: 'Free writing assistance for all students. Located in Building A, Room 105.',
            link: '#',
            phone: '(555) 123-4567'
        },
        {
            id: 2,
            title: 'Student Health Center',
            category: 'Health & Wellness',
            description: 'On-campus medical services, counseling, and wellness programs available year-round.',
            link: '#',
            phone: '(555) 234-5678'
        },
        {
            id: 3,
            title: 'Career Development Office',
            category: 'Career Services',
            description: 'Resume reviews, interview prep, and job placement assistance. Make an appointment today!',
            link: '#',
            phone: '(555) 345-6789'
        },
        {
            id: 4,
            title: 'Residential Life',
            category: 'Housing & Residential',
            description: 'Housing applications, roommate selection, and residence hall information.',
            link: '#',
            phone: '(555) 456-7890'
        },
        {
            id: 5,
            title: 'Financial Aid Office',
            category: 'Financial Aid',
            description: 'Scholarships, grants, loans, and FAFSA assistance available.',
            link: '#',
            phone: '(555) 567-8901'
        },
        {
            id: 6,
            title: 'IT Help Desk',
            category: 'Technology Support',
            description: 'Technical support, password resets, and software assistance.',
            link: '#',
            phone: '(555) 678-9012'
        },
        {
            id: 7,
            title: 'Disability Services',
            category: 'Academic Support',
            description: 'Accommodations and support services for students with disabilities.',
            link: '#',
            phone: '(555) 789-0123'
        },
        {
            id: 8,
            title: 'Counseling Services',
            category: 'Health & Wellness',
            description: 'Mental health support and counseling services for all students.',
            link: '#',
            phone: '(555) 890-1234'
        },
        {
            id: 9,
            title: 'Internship Opportunities',
            category: 'Career Services',
            description: 'Browse and apply for internships with partner companies.',
            link: '#',
            phone: '(555) 901-2345'
        },
        {
            id: 10,
            title: 'Student Loan Information',
            category: 'Financial Aid',
            description: 'Information about federal and private student loan options.',
            link: '#',
            phone: '(555) 012-3456'
        }
    ]
};

// ===== GLOBAL VARIABLES FOR STATE MANAGEMENT =====
// Purpose: Keep track of current search term and selected category
let currentSearchTerm = '';
let selectedCategoryFilter = '';

// ===== INITIALIZE PAGE ON LOAD =====
// Purpose: Load and display all content when page first loads
document.addEventListener('DOMContentLoaded', () => {
    displayAlerts();
    displayCategories();
    displayResources();
    setupEventListeners();
});

// ===== DISPLAY ALERTS/ANNOUNCEMENTS =====
// Purpose: Show important updates and announcements to students
function displayAlerts() {
    const container = document.getElementById('alerts-container');
    container.innerHTML = '';

    // Create alert element for each announcement
    resourcesData.alerts.forEach(alert => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${alert.type} alert-dismissible fade show`;
        alertElement.role = 'alert';
        
        alertElement.innerHTML = `
            <h4 class="alert-heading">${alert.title}</h4>
            <p>${alert.message}</p>
            <small class="text-muted">Posted on ${new Date(alert.date).toLocaleDateString()}</small>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        container.appendChild(alertElement);
    });
}

// ===== DISPLAY RESOURCE CATEGORIES =====
// Purpose: Show category cards for browsing resources by type
// Event-driven: Click handler to filter resources by category
function displayCategories() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    // Create category card for each category
    resourcesData.categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'col-md-4 col-lg-2 mb-3';
        
        categoryCard.innerHTML = `
            <button 
                class="btn btn-${category.color} w-100 text-left category-btn" 
                data-category="${category.name}"
                style="padding: 1.5rem; text-align: center; white-space: normal; height: 100%;"
            >
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">${category.icon}</div>
                <div style="font-weight: bold; font-size: 0.95rem;">${category.name}</div>
                <small>${category.count} items</small>
            </button>
        `;

        // EVENT LISTENER: Category button click to filter resources
        const btn = categoryCard.querySelector('.category-btn');
        btn.addEventListener('click', () => {
            selectedCategoryFilter = category.name;
            displayResources();
            // Scroll to resources section
            document.getElementById('resources-container').scrollIntoView({ behavior: 'smooth' });
        });

        container.appendChild(categoryCard);
    });
}

// ===== DISPLAY RESOURCES =====
// Purpose: Show resource cards filtered by search term and category
// Filters: Search term and selected category
function displayResources() {
    const container = document.getElementById('resources-container');
    container.innerHTML = '';

    // Filter resources based on current filters
    const filtered = resourcesData.resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                            resource.description.toLowerCase().includes(currentSearchTerm.toLowerCase());
        const matchesCategory = selectedCategoryFilter === '' || resource.category === selectedCategoryFilter;
        return matchesSearch && matchesCategory;
    });

    // Display message if no resources match
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info" role="alert">
                    <h4 class="alert-heading">No Resources Found</h4>
                    <p>Try adjusting your search or selecting a different category.</p>
                </div>
            </div>
        `;
        return;
    }

    // Create and display resource card for each filtered resource
    filtered.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'col-md-6 col-lg-4 mb-4';
        
        resourceCard.innerHTML = `
            <div class="card h-100 resource-card">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${resource.title}</h5>
                    <span class="badge bg-secondary mb-2" style="width: fit-content;">${resource.category}</span>
                    <p class="card-text flex-grow-1">${resource.description}</p>
                </div>
                <div class="card-footer bg-light">
                    <p class="mb-1"><strong>📞 Phone:</strong> ${resource.phone}</p>
                    <a href="${resource.link}" class="btn btn-sm btn-primary mt-2">Learn More</a>
                </div>
            </div>
        `;
        
        container.appendChild(resourceCard);
    });
}

// ===== SETUP EVENT LISTENERS =====
// Purpose: Initialize all event-driven interactions on the page
// Events: Search input, search button, resource search
function setupEventListeners() {
    const searchInput = document.getElementById('resource-search');
    const searchBtn = document.getElementById('resource-search-btn');

    // EVENT LISTENER: Search button click
    searchBtn.addEventListener('click', () => {
        currentSearchTerm = searchInput.value;
        selectedCategoryFilter = ''; // Reset category filter when searching
        displayResources();
    });

    // EVENT LISTENER: Real-time search as user types
    searchInput.addEventListener('keyup', () => {
        currentSearchTerm = searchInput.value;
        selectedCategoryFilter = ''; // Reset category filter when searching
        displayResources();
    });

    // Keyboard accessibility: Allow Enter key to trigger search
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            currentSearchTerm = searchInput.value;
            selectedCategoryFilter = '';
            displayResources();
        }
    });
}
