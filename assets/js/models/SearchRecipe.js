import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getRecipe() {
        try {
            const res = await axios({
                "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
                "headers": {
                "content-type":"application/json",
                "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key":"473d65bd27mshd85a019f77cb5afp136826jsn37b1bf9ed16a"
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