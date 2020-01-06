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
            this.results = res.data.results;
        } 
        catch(error) {
            console.log(error)
        }
    } 
}