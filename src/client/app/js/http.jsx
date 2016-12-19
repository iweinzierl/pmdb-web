"use strict";

/**
 * RESTful resource to manage users.
 *
 * @param accessToken
 * @constructor
 */
function UsersResource(accessToken) {
    this.accessToken = accessToken;
}

UsersResource.prototype.get = function (successCallback, errorCallback) {
    console.log("GET /user");

    const headers = new Headers({
        "Accept": "application/json",
        "X-Authorization": this.accessToken
    });

    fetch("http://localhost:9000/user", {headers: headers})
        .then(function (response) {
            if (response.status >= 400 && errorCallback !== undefined) {
                errorCallback(response.status);
            }
            else if (successCallback !== undefined) {
                response.json().then(function (data) {
                    successCallback(data);
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            window.location = "/login.html";
        });
};

/**
 * RESTful resource to manage movies.
 *
 * @param accessToken
 * @constructor
 */
function MoviesResource(accessToken) {
    this.accessToken = accessToken;
}

MoviesResource.prototype.get = function (successCallback, errorCallback) {
    console.log("GET /movies");

    const headers = new Headers({
        "Accept": "application/json",
        "X-Authorization": this.accessToken
    });

    fetch("http://localhost:9000/movies", {headers: headers})
        .then(function (response) {
            if (response.status >= 400 && errorCallback !== undefined) {
                errorCallback(response.status);
            }
            else if (successCallback !== undefined) {
                response.json().then(function (data) {
                    successCallback(data);
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            window.location = "/login.html";
        });
};

MoviesResource.prototype.post = function (movie, successCallback, errorCallback) {
    console.log("POST /movies");

    const headers = new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Authorization": this.accessToken
    });

    const params = {
        headers: headers,
        method: "POST",
        body: JSON.stringify(movie)
    };

    fetch("http://localhost:9000/movies", params)
        .then(function (response) {
            if (response.status >= 400 && errorCallback !== undefined) {
                errorCallback(response.status);
            }
            else if (successCallback !== undefined) {
                response.json().then(function (data) {
                    successCallback(data);
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            window.location = "/login.html";
        });
};

/**
 * RESTful resource to manage genres.
 *
 * @param accessToken
 * @constructor
 */
function GenresResource(accessToken) {
    this.accessToken = accessToken;
}

GenresResource.prototype.get = function (successCallback, errorCallback) {
    console.log("GET /genres");

    const headers = new Headers({
        "Accept": "application/json",
        "X-Authorization": this.accessToken
    });

    fetch("http://localhost:9000/genres", {headers: headers})
        .then(function (response) {
            if (response.status >= 400 && errorCallback !== undefined) {
                errorCallback(response.status);
            }
            else if (successCallback !== undefined) {
                response.json().then(function (data) {
                    successCallback(data);
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            window.location = "/login.html";
        });
};

module.exports = {
    UsersResource: UsersResource,
    MoviesResource: MoviesResource,
    GenresResource: GenresResource
};
