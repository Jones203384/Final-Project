/**
 * Main Application JavaScript
 * Purpose: Handle global app functionality, utility functions, and shared event listeners
 * Features: Smooth scrolling, loading spinners, keyboard navigation, page title updates
 */

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
// Purpose: Provide smooth animated scrolling when clicking anchor links
// This improves user experience with a fluid transition to target sections
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

// ===== LOADING SPINNER FUNCTIONS =====
// Purpose: Display and hide loading indicators when fetching dynamic content
// showLoading(elementId): Displays spinner in specified element
// hideLoading(elementId): Removes spinner from specified element
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
    }
}

function hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '';
    }
}

// ===== KEYBOARD NAVIGATION FOR CARDS =====
// Purpose: Allow users to navigate card elements using Enter or Space keys
// Improves accessibility for keyboard-only users
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

// ===== ANNOUNCEMENTS TOGGLE =====
// Purpose: Show/hide additional announcements with event-driven programming
// Demonstrates interactivity by toggling display of extra content
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-announcements-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const extraAnnouncements = document.getElementById('extra-announcements');
            if (extraAnnouncements && extraAnnouncements.style.display === 'none') {
                extraAnnouncements.style.display = 'block';
                toggleBtn.textContent = 'Show Less Announcements';
            } else if (extraAnnouncements) {
                extraAnnouncements.style.display = 'none';
                toggleBtn.textContent = 'Show More Announcements';
            }
        });
    }
});

// ===== PAGE TITLE UPDATE =====
// Purpose: Dynamically update page title for improved navigation clarity
// Useful for single-page app features or dynamic content changes
function updatePageTitle(title) {
    document.title = title + ' - Campus Life Super App';
}