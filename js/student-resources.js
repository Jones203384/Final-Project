/**
 * Student Resources Management
 * Purpose: Display, search, filter, and organize campus student resources
 * Features: Resource categorization (academic, health, financial, career), search functionality
 */

// ===== STATIC RESOURCES DATA =====
// Purpose: Local data storage for student resources (placeholder for future database integration)
// Each resource contains: id, title, category, description, link, type
const resourcesData = [
    {
        id: 1,
        title: 'Academic Advising Center',
        category: 'academic',
        description: 'Get help with course selection, degree planning, and academic goals.',
        link: '#',
        type: 'service'
    },
    {
        id: 2,
        title: 'Writing Center',
        category: 'academic',
        description: 'Free tutoring for writing assignments and research papers.',
        link: '#',
        type: 'service'
    },
    {
        id: 3,
        title: 'Counseling Services',
        category: 'health',
        description: 'Confidential mental health support and counseling.',
        link: '#',
        type: 'service'
    },
    {
        id: 4,
        title: 'Student Health Center',
        category: 'health',
        description: 'Medical care, vaccinations, and health education.',
        link: '#',
        type: 'service'
    },
    {
        id: 5,
        title: 'Financial Aid Office',
        category: 'financial',
        description: 'Apply for scholarships, grants, and work-study programs.',
        link: '#',
        type: 'service'
    },
    {
        id: 6,
        title: 'FAFSA Guide',
        category: 'financial',
        description: 'Step-by-step guide to completing the Free Application for Federal Student Aid.',
        link: '#',
        type: 'guide'
    },
    {
        id: 7,
        title: 'Career Center',
        category: 'career',
        description: 'Resume building, job search assistance, and internship opportunities.',
        link: '#',
        type: 'service'
    },
    {
        id: 8,
        title: 'Alumni Network',
        category: 'career',
        description: 'Connect with alumni for mentorship and career advice.',
        link: '#',
        type: 'network'
    }
];

// ===== DISPLAY RESOURCES ON PAGE =====
// Purpose: Render resource cards in grid layout with Bootstrap cards
// Features: Category badges, descriptions, links
function displayResources(resources) {
    const resourcesContainer = document.getElementById('resources-container');
    resourcesContainer.innerHTML = '';

    // Handle no results case
    if (resources.length === 0) {
        resourcesContainer.innerHTML = '<div class="col-12"><p class="text-center">No resources found.</p></div>';
        return;
    }

    // Create card for each resource
    resources.forEach(resource => {
        const resourceElement = document.createElement('div');
        resourceElement.className = 'col-md-6 col-lg-3 mb-4';
        resourceElement.innerHTML = `
            <div class="card h-100">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${resource.title}</h5>
                    <p class="card-text">${resource.description}</p>
                    <span class="badge bg-secondary mb-2">${resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}</span>
                    <a href="${resource.link}" class="btn btn-primary mt-auto">Learn More</a>
                </div>
            </div>
        `;
        resourcesContainer.appendChild(resourceElement);
    });
}

// ===== FILTER RESOURCES BY CATEGORY =====
// Purpose: Display only resources that match the selected category
// Logic: If category parameter provided, filter; otherwise show all
function filterResources(category) {
    const filteredResources = category ? resourcesData.filter(resource => resource.category === category) : resourcesData;
    displayResources(filteredResources);
}

// ===== SEARCH RESOURCES =====
// Purpose: Filter resources based on user search input
// Logic: Match search term against resource title and description (case-insensitive)
function searchResources() {
    const searchTerm = document.getElementById('resource-search').value.toLowerCase();
    
    // Filter resources that match search term in title or description
    const filteredResources = resourcesData.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm) || 
        resource.description.toLowerCase().includes(searchTerm)
    );
    
    displayResources(filteredResources);
}

// ===== EVENT LISTENERS FOR SEARCH =====
// Purpose: Attach handlers for search functionality
// Features: Live search as user types
document.addEventListener('DOMContentLoaded', function() {
    // Display all resources initially
    displayResources(resourcesData);

    // Search input event listener - filters as user types
    document.getElementById('resource-search').addEventListener('input', searchResources);
});