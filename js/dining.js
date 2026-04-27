/**
 * Dining API Integration
 * Purpose: Fetch and display meal ideas/recipes from the Spoonacular API
 * API: Spoonacular (https://spoonacular.com/food-api)
 * Features: Random recipe fetching, recipe images, cooking time, servings info
 */

// ===== API CONFIGURATION =====
// Replace YOUR_SPOONACULAR_API_KEY with your actual API key from Spoonacular
const SPOONACULAR_API_KEY = 'YOUR_SPOONACULAR_API_KEY';

// ===== FETCH RANDOM RECIPE FROM API =====
// Purpose: Make async request to Spoonacular API for random recipe suggestion
// Flow: Display loading spinner → Fetch recipe → Display or show error
async function fetchRandomRecipe() {
    const url = `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=1`;

    try {
        showLoading('recipe-container');
        
        // API request with error checking
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse response and display first recipe from results
        const data = await response.json();
        displayRecipe(data.recipes[0]);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        displayRecipeError('Unable to load recipe. Please check your API key and try again.');
    } finally {
        hideLoading('recipe-container');
    }
}

// ===== DISPLAY RECIPE INFORMATION =====
// Purpose: Render recipe card with image, title, summary, cook time, and servings
// Features: HTML tag removal from summary, link to full recipe
function displayRecipe(recipe) {
    const recipeContainer = document.getElementById('recipe-container');
    
    // Create recipe card with all details
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

// ===== ERROR HANDLING =====
// Purpose: Display user-friendly error message when API fails
function displayRecipeError(message) {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Error</h4>
            <p>${message}</p>
        </div>
    `;
}

// ===== EVENT LISTENER FOR RECIPE BUTTON =====
// Purpose: Attach click handler to "Get Random Recipe" button
// Allows user to fetch new recipe ideas on demand
document.addEventListener('DOMContentLoaded', function() {
    const getRecipeBtn = document.getElementById('get-recipe-btn');
    if (getRecipeBtn) {
        getRecipeBtn.addEventListener('click', fetchRandomRecipe);
    }
});