// General JavaScript for Campus Life Super App

// Function to handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Function to add loading spinner for dynamic content
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
    }
}

// Function to hide loading spinner
function hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '';
    }
}

// Accessibility: Add keyboard navigation for cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = card.querySelector('a');
                if (link) link.click();
            }
        });
    });
});

// Function to update page title dynamically (for future use)
function updatePageTitle(title) {
    document.title = title + ' - Campus Life Super App';
}

// Event-driven programming: Toggle extra announcements
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-announcements-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const extraAnnouncements = document.getElementById('extra-announcements');
            if (extraAnnouncements.style.display === 'none') {
                extraAnnouncements.style.display = 'block';
                toggleBtn.textContent = 'Show Less Announcements';
            } else {
                extraAnnouncements.style.display = 'none';
                toggleBtn.textContent = 'Show More Announcements';
            }
        });
    }
});