const appId = '1062834099565688109';
const baseUrl = 'https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426';

async function fetchCategories() {
    const url = `${baseUrl}?applicationId=${appId}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    return data.result.large;
}

async function fetchRecipes(categoryId) {
    const url = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${appId}&categoryId=${categoryId}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    return data.result;
}

function displayCategories(categories) {
    const categoriesContainer = document.getElementById('categories');
    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');
        categoryElement.textContent = category.categoryName;
        categoryElement.addEventListener('click', () => loadRecipes(category.categoryId));
        categoriesContainer.appendChild(categoryElement);
    });
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML = `
            <img src="${recipe.foodImageUrl}" alt="${recipe.recipeTitle}">
            <h3>${recipe.recipeTitle}</h3>
            <p>${recipe.recipeDescription}</p>
            <div class="recipe-details">
                <p><strong>調理時間:</strong> ${recipe.recipeIndication}</p>
                <p><strong>費用:</strong> ${recipe.recipeCost}</p>
                <p><strong>ランキング:</strong> ${recipe.rank}位</p>
            </div>
        `;
        recipeElement.addEventListener('click', () => window.open(recipe.recipeUrl, '_blank'));
        recipesContainer.appendChild(recipeElement);
    });
}

async function loadRecipes(categoryId) {
    const recipes = await fetchRecipes(categoryId);
    displayRecipes(recipes);
}

async function init() {
    const categories = await fetchCategories();
    displayCategories(categories);
}

init();