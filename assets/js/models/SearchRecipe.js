import axios from 'axios';
import apiConfig from './apiConfig';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getRecipes() {
        try {
            const res = await axios({
                "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
                "headers": {
                    "content-type":"application/json",
                    "x-rapidapi-host": apiConfig.host,
                    "x-rapidapi-key": apiConfig.key
                },
                "params": {
                    "query": this.query
                }
            })
            this.results = res.data.results;
        } 
        catch(error) {
            console.log(error)
        }
    }
}