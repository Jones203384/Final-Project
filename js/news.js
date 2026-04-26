// News API integration for Campus Life Super App

const NEWS_API_KEY = 'YOUR_NEWS_API_KEY'; // Replace with your actual API key
const QUERY = 'education'; // Search query for campus-related news
const COUNTRY = 'us'; // Country code for news

// Function to fetch news data
async function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?q=${QUERY}&country=${COUNTRY}&apiKey=${NEWS_API_KEY}`;

    try {
        showLoading('news-container');
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news data:', error);
        displayNewsError('Unable to load news. Please check your API key and try again.');
    } finally {
        hideLoading('news-container');
    }
}

// Function to display news articles
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    if (articles.length === 0) {
        newsContainer.innerHTML = '<div class="col-12"><p class="text-center">No news articles found.</p></div>';
        return;
    }

    articles.slice(0, 10).forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'col-md-6 col-lg-4 mb-4';
        articleElement.innerHTML = `
            <div class="card h-100">
                <img src="${article.urlToImage || 'assets/placeholder.jpg'}" class="card-img-top" alt="${article.title}" style="height: 200px; object-fit: cover;">
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

// Function to display error message
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

// Load news data when page loads
document.addEventListener('DOMContentLoaded', fetchNews);