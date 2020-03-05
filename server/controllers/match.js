
const axios = require("axios")

class Controller {
    static showMatch(request,response,next){
        axios({
            method:"get",
            url:"https://sportspage-feeds.p.rapidapi.com/games?league=NBA",
            headers:{
                "x-rapidapi-key":"16139a36f8msh3f112a2ca21d7e6p19f2c3jsn2affa2188090",
                "x-rapidapi-host":"sportspage-feeds.p.rapidapi.com"
            },
        })
        .then(res=>{
            response.status(201).json(res.data)
        })
        .catch(err=>{
            response.json(err)
        })
    }
}

module.exports =Controller