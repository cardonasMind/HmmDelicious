import axios from 'axios';
import apiConfig from './apiConfig';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios({
                "method": "GET",
                "url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.id}/information`,
                "headers": {
                    "content-type":"application/json",
                    "x-rapidapi-host": apiConfig.host,
                    "x-rapidapi-key": apiConfig.key
                }
            })
            const resData = res.data;

            this.title = resData.title;
            this.image = resData.image;

            this.cheap = resData.cheap;
            this.occasions = resData.occasions;

            this.dairyFree = resData.dairyFree;
            this.veryHealthy = resData.veryHealthy;
            this.healthScore = resData.healthScore;

            this.preparationMinutes = resData.preparationMinutes;
            this.cookingMinutes = resData.cookingMinutes;
            this.readyInMinutes = resData.readyInMinutes;
            this.servings = resData.servings;
            
            this.extendedIngredients = resData.extendedIngredients;
            this.sourceUrl = resData.sourceUrl;
        
        } 
        catch(error) {
            console.log(error)
        }
    } 
}