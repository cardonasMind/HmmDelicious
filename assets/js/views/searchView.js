import DOMElements from './DOMElements';

export const getInputValue = () => DOMElements.searchInput.value;

export const changeActualSearchTitle = (search, recipesLength) => {
    DOMElements.actualSearchTitle.innerText = `Recipes for ${search} (${recipesLength})`;
}

export const clearActualRecipes = (parent, type) => {
    if(type === "searched") {
        DOMElements.searchInput.value = "";
    }  else if(type === "saved") {

    }

    // Restart where is the recipes
    parent.innerHTML = "";

    // Restart the pagination buttons
    parent.nextElementSibling.innerHTML = "";
}

/*
    SEARCH LOADER 
*/    

// Search loader wich is a food with a blink effect
export const renderSearchLoader = (parent) => {
    const loader = `
        <div id="search-loader">
            <div id="placeholder-div">
                <img id="blink-loader"src="images/placeholder-image.png" />
            </div>
        </div>
    `;

    parent.innerHTML = loader;
}

// Just for clear the search loader when the page is correctly
export const clearSearchLoader = () => {
    const loader = document.getElementById('search-loader');
    if(loader) loader.parentElement.removeChild(loader);
}

//************************************************************************//


/*
    PRINTING ALL THE RECIPES
    (IT WORKS FOR SAVED RECIPES AND FOR SARCHED RECIPES)
*/    

// it prints a recipe to be clicked later
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

// This is for get th onclick event for print the recipe info wich comes from index.js
let recipeOnClickEvent;

export const getRecipeOnClickEvent = (event) => {
    recipeOnClickEvent = event;
}

// This is for control the print of the recipes, this gets the recipes and later print them
export const printRecipes = (recipes, parent = DOMElements.recipesList, page = 1, recipesPerPage = 4) => {
    // This thing obtains where in the array we need to be
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
            clearActualRecipes(parent);
            printRecipes(recipes, parent, Number(e.target.dataset.goto), recipesPerPage);
        }
    }

    // Adding the onclick event for every recipe, the event comes from the index.js
    const recipeItems = document.querySelectorAll(`#${parent.id} .recipe-item`);
    for(let recipe of recipeItems) {
        recipe.onclick = () => {
            recipeOnClickEvent(recipe.dataset.recid)
        }
    }
}



/*
    ERROR MESSAGES
*/

export const nothingFoundError = () => `
    <div id="placeholder-div">
        <img id="placeholder-image" src="images/placeholder-image.png" />
        <h1>NOTHING HERE :(</h1>
    </div>
`;