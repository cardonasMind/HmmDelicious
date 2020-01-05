import DOMElements from './views/DOMElements';
import * as searchView from './views/searchView';
import SearchRecipe from './models/SearchRecipe';

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
        searchView.clearSearchLoader();
        searchView.printRecipes(await state.search.results);
    }
    
}

/* RECIPE LIST PAGINATION */
DOMElements.recipesListPagination.onclick = (e) => {
    searchView.clearActualRecipe();
    searchView.printRecipes(state.search.results, Number(e.target.dataset.goto));
}