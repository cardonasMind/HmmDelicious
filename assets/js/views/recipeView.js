import DOMElements from './DOMElements';

let ingredients = "";

const createIngredient = ingredient => {
    const ingredientMakeup = `
        <div class="recipe-ingredient">
        <image src="https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}" />
            <h4>${ingredient.name}</h4>
        </div>
    `;

    ingredients += ingredientMakeup;
}

export const printActualRecipe = (recipeInfo) => {
    // This is for print the ingredients
    console.log(recipeInfo)
    recipeInfo.extendedIngredients.forEach(ingredient => createIngredient(ingredient))

    const recipe = `
        <div id="recipe-container">
            <div id="recipe-header">
                <img id="close-recipe" src="images/icons/back-arrow-icon.png">
                <h2>${recipeInfo.title}</h2>
                <img id="save-recipe" src="images/icons/save-recipe-icon.png">
            </div>

            <div id="recipe-image" style="background-image: url(${recipeInfo.image})"></div>

            <div id="recipe-info">
                <div id="principal-info">
                    <p><img id="recipe-cost" src="images/icons/cash-icon.png"/>${recipeInfo.cheap ? "Cheap" : "Expensive"}</p>
                    ${recipeInfo.occasions > 0 ? `<p>Perfect for: ${recipeInfo.occasions}</p>` : ""}
                </div>

                <h3>Health info</h3>
                <div id="health-info">
                    <div id="dairy-free-info">
                        <img src="images/icons/dairy-icon.png" />
                        ${recipeInfo.dairyFree ? "Dairy free" : "Contains dairy"}
                    </div>
                    <div id="heart-info">
                        <img src="images/icons/${recipeInfo.veryHealthy ? "good" : "bad"}-heart-icon.png" />
                        ${recipeInfo.healthScore}/100
                    </div>
                </div>

                <h3>Preparation info</h3>
                <div id="preparation-info">
                    <div id="preparation-time-info">
                        <img src="images/icons/time-icon.png" />
                        <p>Preparation</p>
                        <h4>${recipeInfo.preparationMinutes} minutes</h4>
                    </div>
                    <div id="cooking-time-info">
                        <img src="images/icons/cooking-icon.png" />
                        <p>Cooking time</p>
                        <h4>${recipeInfo.cookingMinutes} minutes</h4>
                    </div>
                    <div id="ready-in-info">
                        <img src="images/icons/ready-icon.png" />
                        <p>Ready in ${recipeInfo.readyInMinutes} minutes for ${recipeInfo.servings} amazing persons!</p>
                    </div>
                </div>

                <h3>Ingredients</h3>
                <div id="recipe-ingredients">
                    ${ingredients}
                </div>

                <h3>Recipe from</h3>
                <a href=${recipeInfo.sourceUrl}>Go to source page...</a>
            </div>
        </div>
    `

    DOMElements.actualRecipeContainer.innerHTML = recipe;
}