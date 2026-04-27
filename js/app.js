/**
 * Campus Life Super App - Main Application JavaScript
 * Purpose: Provide core functionality and utilities for all pages
 * Features: Smooth scrolling, loading spinners, keyboard accessibility, utility functions
 * Pattern: Event-driven programming with helper functions
 */

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
// Purpose: Provide smooth animated scrolling when clicking internal anchor links
// Benefits: Better user experience compared to instant jumps
// How it works: Intercepts anchor link clicks and smoothly scrolls to target
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===== LOADING SPINNER MANAGEMENT =====
// Purpose: Display loading indicators while fetching data from APIs
// Usage: Call showLoading() before API request, hideLoading() after response
// Benefits: Provides visual feedback to user during asynchronous operations

/**
 * Display loading spinner in specified element
 * @param {string} elementId - The HTML element ID where spinner should appear
 * Usage: showLoading('weather-content');
 */
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `;
    }
}

/**
 * Remove loading spinner from specified element
 * @param {string} elementId - The HTML element ID where spinner should be cleared
 * Usage: hideLoading('weather-content');
 */
function hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '';
    }
}

// ===== KEYBOARD ACCESSIBILITY FOR CARDS =====
// Purpose: Enable keyboard navigation for interactive card elements
// How it works: Allows users to select cards with Tab key and activate with Enter/Space
// Benefits: Improves accessibility for users who cannot use mouse
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card, .event-card, .resource-card');
    cards.forEach(card => {
        // Make card focusable via keyboard
        if (!card.hasAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
        }

        // Listen for Enter or Space key presses
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Look for a link or button to click
                const link = card.querySelector('a, button');
                if (link) link.click();
            }
        });
    });
});

// ===== PAGE TITLE UTILITY FUNCTION =====
// Purpose: Dynamically update page title while maintaining app branding
// Usage: updatePageTitle('Events') → Sets title to 'Events - Campus Life Super App'
/**
 * Update the page title with app branding
 * @param {string} title - The page-specific title to display
 * Usage: updatePageTitle('Events');
 */
function updatePageTitle(title) {
    document.title = title + ' - Campus Life Super App';
}

// ===== UTILITY: FORMAT DATE FOR DISPLAY =====
// Purpose: Consistently format dates throughout the application
// Returns: Human-readable date string like "Mon, Apr 28, 2026"
/**
 * Format a date string for display
 * @param {string} dateString - ISO format date string (e.g., '2026-04-28')
 * @param {string} format - 'short' or 'long' format
 * @returns {string} Formatted date string
 * Usage: formatDate('2026-04-28', 'short') → 'Mon, Apr 28'
 */
function formatDate(dateString, format = 'short') {
    const date = new Date(dateString);
    if (format === 'long') {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
}

// ===== UTILITY: DEBOUNCE FUNCTION =====
// Purpose: Prevent excessive function calls during rapid events (e.g., typing)
// Benefits: Improves performance when handling frequent events
/**
 * Create a debounced version of a function
 * @param {function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {function} Debounced function
 * Usage: const debouncedSearch = debounce(searchFunction, 300);
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// ===== UTILITY: LOCAL STORAGE HELPERS =====
// Purpose: Persist user preferences and data in browser storage
// Benefits: Remember user choices between sessions

/**
 * Save data to browser's local storage
 * @param {string} key - Storage key name
 * @param {*} value - Value to store (will be converted to JSON)
 * Usage: saveToStorage('userPreferences', {theme: 'dark'});
 */
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to storage:', error);
    }
}

/**
 * Retrieve data from browser's local storage
 * @param {string} key - Storage key name
 * @returns {*} Stored value or null if not found
 * Usage: const preferences = getFromStorage('userPreferences');
 */
function getFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error retrieving from storage:', error);
        return null;
    }
}

/**
 * Remove data from browser's local storage
 * @param {string} key - Storage key name
 * Usage: removeFromStorage('userPreferences');
 */
function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from storage:', error);
    }
}

// ===== UTILITY: ERROR HANDLER =====
// Purpose: Display consistent error messages throughout the app
/**
 * Display error message to user
 * @param {string} message - Error message to display
 * @param {string} containerId - ID of container for error message (optional)
 * Usage: showError('Failed to load data');
 */
function showError(message, containerId) {
    console.error('Error:', message);
    
    if (containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <h4 class="alert-heading">Error</h4>
                    <p>${message}</p>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
        }
    }
}

// ===== APP INITIALIZATION =====
// Purpose: Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Log app initialization for debugging
    console.log('Campus Life Super App initialized successfully');
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ===== EXPORT FUNCTIONS FOR USE IN OTHER MODULES =====
// Note: These functions are available globally and can be called from any script
// Available functions:
// - showLoading(elementId)
// - hideLoading(elementId)
// - updatePageTitle(title)
// - formatDate(dateString, format)
// - debounce(func, delay)
// - saveToStorage(key, value)
// - getFromStorage(key)
// - removeFromStorage(key)
// - showError(message, containerId)
