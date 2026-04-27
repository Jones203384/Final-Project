// Student Resources page JavaScript for Campus Life Super App

// Static resources data (placeholder for future database/API integration)
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

// Function to display resources
function displayResources(resources) {
    const resourcesContainer = document.getElementById('resources-container');
    resourcesContainer.innerHTML = '';

    if (resources.length === 0) {
        resourcesContainer.innerHTML = '<div class="col-12"><p class="text-center">No resources found.</p></div>';
        return;
    }

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

// Function to filter resources by category
function filterResources(category) {
    const filteredResources = category ? resourcesData.filter(resource => resource.category === category) : resourcesData;
    displayResources(filteredResources);
}

// Function to search resources
function searchResources() {
    const searchTerm = document.getElementById('resource-search').value.toLowerCase();
    const filteredResources = resourcesData.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm) || 
        resource.description.toLowerCase().includes(searchTerm)
    );
    displayResources(filteredResources);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Display all resources initially
    displayResources(resourcesData);

    // Search input event listener
    document.getElementById('resource-search').addEventListener('input', searchResources);
});