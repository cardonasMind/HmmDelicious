import DOMElements from './views/DOMElements';
import * as searchView from './views/searchView';
import SearchRecipe from './models/SearchRecipe';
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';

let state = {
    savedRecipesIsHidden: true,
    actualRecipeIsHidden: true,
}


/*
    RECIPE CONTROL
*/

const actualRecipeContainer = DOMElements.actualRecipeContainer;

// This works when we make click on a recipe
const printNewRecipe = async (recipeId) => {
    if(recipeId) {
        // Change the overflow of the main section
        DOMElements.mainSection.style.overflow = "auto";

        // Change the style of the recipe for make it visible
        actualRecipeContainer.style.top = "0";
        state.actualRecipeIsHidden = false;

        // Start a loader while the data comes from the API
        searchView.renderSearchLoader(actualRecipeContainer);

        // Making a request to the API for the data of the recipe
        state.recipe = new Recipe(recipeId);
        await state.recipe.getRecipe();

        recipeView.printActualRecipe(await state.recipe);
        searchView.clearSearchLoader();

        // Close the saved recipes container
        if(!state.savedRecipesIsHidden) {
            hideSavedRecipesContainer();
        }
    }
}

// It sends the function the the searchView wich add the onclick event for every recipe item
searchView.getRecipeOnClickEvent(printNewRecipe)

// This code will get onclick event in some buttons inside the recipe container
actualRecipeContainer.onclick = e => {
    if(e.target.id === "close-recipe") {
        // Change the overflow of the main section
        DOMElements.mainSection.style.overflow = "hidden";

        // Change th style of the recipe to hidde it
        actualRecipeContainer.style.top = "100vh";
        state.actualRecipeIsHidden = true;
    } else if(e.target.id === "save-recipe") {

    }
 }

/**********************************************************************************/


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
        searchView.clearActualRecipes(searchedRecipesContainer, "searched");
        searchView.renderSearchLoader(searchedRecipesContainer);

        // 4. Print the recipes in DOM
        if(await state.search.results.length === 0) {
            searchedRecipesContainer.innerHTML = searchView.nothingFoundError();
        } else {
            searchView.printRecipes(await state.search.results);
        }
        searchView.clearSearchLoader();
    }   
}

/********************************************************** */


/*
    SAVED RECIPES
*/

const showSavedRecipesContainer = () => {
    state.savedRecipesIsHidden = false;
    DOMElements.savedRecipesContainer.style.display = "initial";

	setTimeout(() => {
		DOMElements.savedRecipesContainer.style.left = "0";
	}, 1);
}

const hideSavedRecipesContainer = () => {
    state.savedRecipesIsHidden = true;
    DOMElements.savedRecipesContainer.style.left = "100vw";
    
    setTimeout(() => {
        DOMElements.savedRecipesContainer.style.display = "none";
    }, 1000);
}

// Display the saved recipes
DOMElements.savedRecipesButton.onclick = () => {
    const likedRecipes = [
        {
            id: 1,
            title: "1",
            servings: 4,
        },
        {
            id: 1,
            title: "2",
            servings: 4,
        },
        {
            id: 1,
            title: "3",
            servings: 4,
        },
        {
            id: 1,
            title: "4",
            servings: 4,
        },
        {
            id: 1,
            title: "5",
            servings: 4,
        },
        {
            id: 1,
            title: "6",
            servings: 4,
        },
        {
            id: 1,
            title: "7",
            servings: 4,
        }
    ]

    if(state.savedRecipesIsHidden) {
        // Show the saved recipes
        showSavedRecipesContainer();

        // Now we need to put all saved recipes
        searchView.printRecipes(likedRecipes, DOMElements.savedRecipes, 1, 3);
    } else {
        // Hide the saved recipes
        hideSavedRecipesContainer();
    }
}