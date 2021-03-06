const axios = require("axios");

class Controller {
  static showMatch(request, response, next) {
    axios({
      method: "get",
      url: "https://sportspage-feeds.p.rapidapi.com/games?league=NBA",
      headers: {
        "x-rapidapi-key": process.env.RAPID_KEY,
        "x-rapidapi-host": "sportspage-feeds.p.rapidapi.com"
      }
    })
      .then(res => {
        let arr = [];
        for (let i = 0; i < res.data.results.length; i++) {
          arr.push({
            gameId: res.data.results[i].gameId,
            title: `${res.data.results[i].teams.away.team} vs ${res.data.results[i].teams.home.team}`,
            schedule: res.data.results[i].schedule.date,
            league: res.data.results[i].details.league,
            season: res.data.results[i].details.season,
            away: {
              name: res.data.results[i].teams.away.team,
              location: res.data.results[i].teams.away.location,
              abbreviation: res.data.results[i].teams.away.abbreviation,
              conference: res.data.results[i].teams.away.conference,
              division: res.data.results[i].teams.away.division
            },
            home: {
              name: res.data.results[i].teams.home.team,
              location: res.data.results[i].teams.home.location,
              abbreviation: res.data.results[i].teams.home.abbreviation,
              conference: res.data.results[i].teams.home.conference,
              division: res.data.results[i].teams.home.division
            },
            venue: {
              name: res.data.results[i].venue.name,
              city: res.data.results[i].venue.city,
              state: res.data.results[i].venue.state
            }
          });
        }
        response.status(201).json(arr);
      })
      .catch(err => {
        response.json(err);
      });
  }
}

module.exports = Controller;
