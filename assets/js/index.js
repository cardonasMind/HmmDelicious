import DOMElements from './views/DOMElements';
import * as searchView from './views/searchView';
import SearchRecipe from './models/SearchRecipe';
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';

const state = {
    savedRecipesIsHidden: true
}

/*
    SEARCH RECIPE
*/

DOMElements.searchButton.onclick = async () => {
    // For search a recipe
    // 1. Get the value of th search input
    const query = searchView.getInputValue();
    const searchedRecipesContainer = DOMElements.recipesList;

    if(query) {
        // 2. Do the search
        state.search = new SearchRecipe(query);
        await state.search.getRecipes();

        // 3. Prepare the UI
        searchView.changeActualSearchTitle(state.search.query, await state.search.results.length);
        searchView.clearActualRecipes("search", searchedRecipesContainer);
        searchView.renderSearchLoader(searchedRecipesContainer);

        // 4. Print the recipes in DOM
        searchView.printRecipes(await state.search.results);
        searchView.clearSearchLoader();
    }   
}

/*
    SAVED RECIPES
*/

// Display the saved recipes
DOMElements.savedRecipesButton.onclick = () => {
    const likedRecipes = [
        {
            id: 1,
            title: "Random",
            servings: 4,
        },
        {
            id: 1,
            title: "Random",
            servings: 4,
        },
        {
            id: 1,
            title: "Random",
            servings: 4,
        },
        {
            id: 1,
            title: "Random",
            servings: 4,
        },
        {
            id: 1,
            title: "Random",
            servings: 4,
        }
    ]

    if(state.savedRecipesIsHidden) {
        state.savedRecipesIsHidden = false;
        DOMElements.savedRecipes.style.left = "0";

        // Now we need to put all saved recipes
        searchView.printRecipes(likedRecipes, DOMElements.savedRecipes);
    } else {
        state.savedRecipesIsHidden = true;
        DOMElements.savedRecipes.style.left = "100vw";
    }
}

/*
    RECIPE CONTROL
*/   

DOMElements.recipesList.onclick = async (e) => {
    const searchedRecipesContainer = DOMElements.recipesList;
    
    // If the click was in the close-recipe button image
    if(e.target.id === "close-recipe") {
        searchView.clearActualRecipes("search", searchedRecipesContainer);
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
            searchView.clearActualRecipes("search", searchedRecipesContainer);
            searchView.renderSearchLoader(searchedRecipesContainer);

            // 4th. Finally we need to clear the loader and print the recipe into DOM
            searchView.clearSearchLoader();
            recipeView.printActualRecipe(state.recipe);
        }
    }
}