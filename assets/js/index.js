import DOMElements from './views/DOMElements';
import * as searchView from './views/searchView';
import SearchRecipe from './models/SearchRecipe';
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';

const state = {}

/*
    SEARCH RECIPE
*/

DOMElements.searchButton.onclick = async () => {
    // For search a recipe
    // 1. Get the value of th search input
    const query = searchView.getInputValue();

    if(query) {
        // 2. Do the search
        state.search = new SearchRecipe(query);
        await state.search.getRecipe();

        // 3. Prepare the UI
        searchView.changeActualSearchTitle(state.search.query, await state.search.results.length);
        searchView.clearActualRecipe();
        searchView.renderSearchLoader(DOMElements.recipesList);

        // 4. Print the recipes in DOM
        searchView.printRecipes(await state.search.results);
        searchView.clearSearchLoader();
    }
    
}

/* 
    RECIPE LIST PAGINATION 
*/

DOMElements.recipesListPagination.onclick = (e) => {
    // Check if the target was a button
    if(e.target.type === 'submit') {
        searchView.clearActualRecipe();
        searchView.printRecipes(state.search.results, Number(e.target.dataset.goto));
    }
}

/*
    RECIPE CONTROL
*/   

DOMElements.recipesList.onclick = async (e) => {
    // If the click was in the close-recipe button image
    if(e.target.id === "close-recipe") {
        searchView.clearActualRecipe("nototal");
        searchView.printRecipes(state.search.results);
    }

    // For insert the selected recipe in the DOM 
    // 1st. We need to get the selected recipe
    if(e.target.closest('.recipe-item')) {
        const recipeId = Number(e.target.closest('.recipe-item').dataset.recid);

        if(recipeId) {
            // 2nd. Then we need to make a new request to the API
            state.recipe = new Recipe(recipeId);
            await state.recipe.getRecipe()

            // 3rd. After the request, simultanly we need to clear the parent and print the loader for a better UI experience
            searchView.clearActualRecipe('total');
            searchView.renderSearchLoader(DOMElements.recipesList);

            // 4th. Finally we need to clear the loader and print the recipe into DOM
            searchView.clearSearchLoader();
            recipeView.printActualRecipe(state.recipe);
        }
    }
    
}