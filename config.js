var address = require("./address.json");

module.exports = {
    "pmdb": {
        "paths": {
            "login": "http://" + address.address + ":8000/login.html",
            "index": "http://localhost:8000",
            "user": "http://" + address.address + ":9000/user",
            "movies": "http://" + address.address + ":9000/movies",
            "genres": "http://" + address.address + ":9000/genres",
            "formats": "http://" + address.address + ":9000/formats"
        },
        "redirectOnError": false
    },
    "moviesearch": {
        "paths": {
            "search": "http://iweinzierl.de:9001/api/movie",
            "details": "http://iweinzierl.de:9001/api/movie"
        }
    },
};