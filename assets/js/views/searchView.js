import DOMElements from './DOMElements';

export const getInputValue = () => DOMElements.searchInput.value;

export const changeActualSearchTitle = (search, recipesLength) => {
    DOMElements.actualSearchTitle.style.display = 'block';
    DOMElements.actualSearchTitle.innerText = `Recipes for ${search} (${recipesLength})`;
}

export const clearActualRecipes = (type, parent) => {
    if(type === "search") {
        DOMElements.searchInput.value = "";
        DOMElements.recipesListPagination.innerHTML = "";
    } 
    parent.innerHTML = "";
    /*if(total === "total") {
        DOMElements.actualSearchTitle.style.display = 'none';
    } else if(total === "nototal") {
        DOMElements.actualSearchTitle.style.display = 'block';
    }
    DOMElements.searchInput.value = "";
    DOMElements.recipesList.innerHTML = "";
    //DOMElements.recipesListPagination.innerHTML = "";*/
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

const newItemRecipe = (recipe, parent) => {
    const recipeItem = `
    <div class="recipe-item" data-recId="${recipe.id}">
        <div class="recipe-image" style="background-image: url(https://spoonacular.com/recipeImages/${recipe.image})"></div>
        <div class="recipe-info">
            <h3>${recipe.title}</h3>
            <p>Ready in ${recipe.readyInMinutes} minutes</p>
            <p>For ${recipe.servings} hungry persons :D</p>
        </div>
    </div>
    `;

    parent.insertAdjacentHTML('beforeend', recipeItem);
}
/*
// This is for add the onclick event to the recipes-pagination, the event comes from index.js
let recipesPaginationClickFromIndex;

export const recipesPaginationClick = e => recipesPaginationClickFromIndex = e;
*/
export const printRecipes = (recipes, parent = DOMElements.recipesList, page = 1, recipesPerPage = 4) => {
    const end = page * recipesPerPage;
    const start = end - recipesPerPage;

    recipes.slice(start, end).forEach(recipe => newItemRecipe(recipe, parent));
    
    // Print the pagination buttons
    let buttons;
    const nextPage = page + 1;
    const prevPage = page - 1;
    
    if(page < 1) {
        console.log("Ocurrió un error, la página es incorrecta");
    } else {
        // If is not pages to display
        if(recipes.length <= recipesPerPage) {
            buttons = '';
        } else {
            if(page === 1) {
                // Is the first page
                buttons = `<button class="pagination-button" id="next-button" data-goto="${nextPage}">Next</button>`;
            
            } else if(page > 1 && page < Math.ceil(recipes.length / recipesPerPage)) {
                buttons = `<button class="pagination-button" id="prev-button" data-goto="${prevPage}">Previous</button>
                <button class="pagination-button" id="next-button" data-goto="${nextPage}">Next</button>`;
            
            } else {
                // Is the last page
                buttons = `<button class="pagination-button" id="prev-button" data-goto="${prevPage}">Previous</button>`
            }
        }
        
    }

    // Inserting the pagination
    const paginationContainer = parent.nextElementSibling;

    paginationContainer.innerHTML = buttons;

    paginationContainer.onclick = e => {
        if(e.target.type === "submit") {
            clearActualRecipes("search", parent);
            printRecipes(recipes, parent, Number(e.target.dataset.goto));
        }
    }
}