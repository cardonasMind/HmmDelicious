import DOMElements from './DOMElements';

export const printActualRecipe = (recipeInfo) => {
    const recipe = `
        <div id="recipe-container">
        <div id="recipe-header">
            <img id="close-recipe" src="images/icons/back-arrow-icon.png" width="30px">
            <h2>${recipeInfo.title}</h2>
            <img id="save-recipe" src="images/icons/save-recipe-icon.png" width="40px">
        </div>
        <div id="recipe-image" style="background-image: url(${recipeInfo.image})"></div>
        <div id="recipe-info">
            <div id="principal-info">
                <p>${recipeInfo.cheap ? "Barato" : "Carito"}</p>
                <p>Perfect for: Xmas, halloween</p>
            </div>

            <h3>Health info</h3>
            <div id="health-info">
                <p>dairyFree: yes</p>
                <p>Hearth: 100/100</p>
            </div>

            <h3>Preparation info</h3>
            <div id="preparation-info">
                <p>Preparation: 10 minutes</p>
                <p>Cooking time: 5 minutes</p>
                <p>Ready in 15 minuts for 4 persons</p>
            </div>

            <h3>Ingredients</h3>
            <div id="recipe-ingredients">
                Milk
                something
                Something more
            </div>

            <h3>Recipe from</h3>
            <p>Recipe from tuputamadre</p>
        </div>
    </div>
    `

    DOMElements.recipesList.innerHTML = recipe;
}