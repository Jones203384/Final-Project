// Dining API integration for Campus Life Super App

const SPOONACULAR_API_KEY = 'YOUR_SPOONACULAR_API_KEY'; // Replace with your actual API key

// Function to fetch random recipe
async function fetchRandomRecipe() {
    const url = `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=1`;

    try {
        showLoading('recipe-container');
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayRecipe(data.recipes[0]);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        displayRecipeError('Unable to load recipe. Please check your API key and try again.');
    } finally {
        hideLoading('recipe-container');
    }
}

// Function to display recipe
function displayRecipe(recipe) {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = `
        <div class="card">
            <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}" style="height: 200px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title">${recipe.title}</h5>
                <p class="card-text">${recipe.summary ? recipe.summary.replace(/<[^>]*>/g, '') : 'No summary available.'}</p>
                <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
                <p><strong>Servings:</strong> ${recipe.servings}</p>
                <a href="${recipe.sourceUrl}" target="_blank" class="btn btn-primary">View Full Recipe</a>
            </div>
        </div>
    `;
}

// Function to display error
function displayRecipeError(message) {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Error</h4>
            <p>${message}</p>
        </div>
    `;
}

// Event listener for the button
document.addEventListener('DOMContentLoaded', function() {
    const getRecipeBtn = document.getElementById('get-recipe-btn');
    if (getRecipeBtn) {
        getRecipeBtn.addEventListener('click', fetchRandomRecipe);
    }
});