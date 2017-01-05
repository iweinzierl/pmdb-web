var address = require("./address.json");

module.exports = {
    "pmdb": {
        "paths": {
            "login": "http://" + address.address + ":8000/login.html",
            "authenticated": "http://localhost:8000/authenticated.html",
            "index": "http://localhost:8000",
            "user": "http://" + address.address + ":9000/user",
            "movies": "http://" + address.address + ":9000/movies",
            "genres": "http://" + address.address + ":9000/genres",
            "formats": "http://" + address.address + ":9000/formats"
        },
        "redirectOnError": false,
        "redirectOnAuthError": false,
        "debug": {
            "reducer": {
                "user": false,
                "movies": true,
                "filter": true
            }
        }
    },
    "moviesearch": {
        "paths": {
            "search": "http://iweinzierl.de:9001/api/movie",
            "details": "http://iweinzierl.de:9001/api/movie"
        }
    },
    "google": {
        "login": {
            "baseUrl": "https://accounts.google.com/o/oauth2/v2/auth",
            "clientId": "590281041484-kfh0l2a24qmvpt2b9f8d2gr16jt1stek.apps.googleusercontent.com",
            "scopes": [
                "email"
            ],
            "responseType": "token"
        }
    }
};