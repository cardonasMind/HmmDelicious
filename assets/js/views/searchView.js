import DOMElements from './DOMElements';

export const getInputValue = () => DOMElements.searchInput.value;

export const changeActualSearchTitle = (search, recipesLength) => {
    DOMElements.actualSearchTitle.innerText = `Recipes for ${search} (${recipesLength})`;
}

export const clearActualRecipe = () => {
    DOMElements.searchInput.value = "";
    DOMElements.recipesList.innerHTML = "";
    DOMElements.recipesListPagination.innerHTML = "";
}

export const renderSearchLoader = (parent) => {
    const loader = `
        <div id="search-loader">
            <div id="placeholder-div">
                <img id="blink-loader"src="images/placeholder-image.png" />
            </div>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearSearchLoader = () => {
    const loader = document.getElementById('search-loader');
    loader.parentElement.removeChild(loader);
}

const newItemRecipe = (recipe) => {
    const recipeItem = `
    <div class="recipe-item">
        <div class="recipe-image" style="background-image: url(https://spoonacular.com/recipeImages/${recipe.image})""></div>
        <div class="recipe-info">
            <h3>${recipe.title}</h3>
            <p>Ready in ${recipe.readyInMinutes} minutes</p>
            <p>For ${recipe.servings} hungry persons :D</p>
        </div>
    </div>
    `;

    DOMElements.recipesList.insertAdjacentHTML('beforeend', recipeItem);
}

export const printRecipes = (recipes, page = 1, recipesPerPage = 4) => {
    const end = page * recipesPerPage;
    const start = end - recipesPerPage;
    recipes.slice(start, end).forEach(recipe => newItemRecipe(recipe));

    // Print the pagination buttons
    let buttons;
    const nextPage = page + 1;
    const prevPage = page - 1;
    
    if(page < 1) {
        console.log("Ocurrió un error, la página es incorrecta");
    } else {
        if(page === 1) {
            // Is the first page
            buttons = `<button class="pagination-button" id="next-button" data-goto="${nextPage}">Siguiente</button>`;
        
        } else if(page > 1 && page < Math.ceil(recipes.length / recipesPerPage)) {
            buttons = `<button class="pagination-button" id="prev-button" data-goto="${prevPage}">Atras</button>
            <button class="pagination-button" id="next-button" data-goto="${nextPage}">Siguiente</button>`;
        
        } else {
            // Is the last page
            buttons = `<button class="pagination-button" id="prev-button" data-goto="${prevPage}">Atras</button>`
        }
    }
    DOMElements.recipesListPagination.insertAdjacentHTML('afterbegin', buttons);
    
}