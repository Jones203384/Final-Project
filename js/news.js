/**
 * News API Integration
 * Purpose: Fetch and display latest news and announcements related to education
 * API: NewsAPI (https://newsapi.org/)
 * Features: Search-based news fetching, article cards with images, pagination, error handling
 */

// ===== API CONFIGURATION =====
// Replace YOUR_NEWS_API_KEY with your actual API key from NewsAPI
const NEWS_API_KEY = '7ff98191a9f84f0faf3072fad7f149ce';
const QUERY = 'education'; // Search query for campus-related news
const COUNTRY = 'us'; // Country code for news filtering

// ===== FETCH NEWS FROM API =====
// Purpose: Make async request to NewsAPI and retrieve top headlines
// Flow: Display loading spinner → Fetch articles → Display or show error
async function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?q=${QUERY}&country=${COUNTRY}&apiKey=${NEWS_API_KEY}`;

    try {
        showLoading('news-container');
        
        // API request with error checking
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse response and pass articles to display function
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news data:', error);
        displayNewsError('Unable to load news. Please check your API key and try again.');
    } finally {
        hideLoading('news-container');
    }
}

// ===== DISPLAY NEWS ARTICLES =====
// Purpose: Render news articles as Bootstrap cards with images, titles, and links
// Features: Image fallback, truncated descriptions, publication date, external links
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    // Check if articles were returned
    if (articles.length === 0) {
        newsContainer.innerHTML = '<div class="col-12"><p class="text-center">No news articles found.</p></div>';
        return;
    }

    // Limit display to first 10 articles and create card for each
    articles.slice(0, 10).forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'col-md-6 col-lg-4 mb-4';
        
        // Create article card with image, title, description, and link
        articleElement.innerHTML = `
            <div class="card h-100">
                <img src="${article.urlToImage || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4='}" class="card-img-top" alt="${article.title}" style="height: 200px; object-fit: cover;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text flex-grow-1">${article.description || 'No description available.'}</p>
                    <a href="${article.url}" target="_blank" class="btn btn-primary mt-auto">Read More</a>
                </div>
                <div class="card-footer text-muted">
                    <small>${new Date(article.publishedAt).toLocaleDateString()}</small>
                </div>
            </div>
        `;
        newsContainer.appendChild(articleElement);
    });
}

// ===== ERROR HANDLING =====
// Purpose: Display user-friendly error message when API fails
function displayNewsError(message) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Error</h4>
                <p>${message}</p>
            </div>
        </div>
    `;
}

// ===== AUTO-LOAD ON PAGE LOAD =====
// Purpose: Automatically fetch and display news when News page loads
document.addEventListener('DOMContentLoaded', fetchNews);