"use strict";

const config = require("../../../../config.js");

import {Movie} from "./domain.jsx";

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

function processError(response, errorCallback) {
    if (response.status == 401 || response.status == 403) {
        if (config.pmdb.redirectOnAuthError) {
            window.location = config.pmdb.paths.login;
        }
    }

    if (errorCallback !== undefined) {
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.indexOf("application/json") !== -1) {
            response.json().then(function (errorJson) {
                errorCallback(response.status, null, errorJson);
            });
        } else {
            response.text().then(function (errorText) {
                errorCallback(response.status, errorText, null);
            });
        }
    }
}

function mapPmdbMovie(movie) {
    return Movie.builder()
        .withId(movie.id)
        .withTitle(movie.title)
        .withDescription(movie.description)
        .withCoverUrl(movie.coverUrl)
        .withReleaseDate(movie.publishDate)
        .withLength(movie.length)
        .withFormat(movie.format)
        .withGenres(movie.genres)
        .build();
}

function mapSearchMovie(movie) {
    return Movie.builder()
        .withId(movie.id)
        .withTitle(movie.title)
        .withDescription(movie.description)
        .withCoverUrl(movie.coverUrl)
        .withReleaseDate(mapSearchReleaseDate(movie.published))
        .withLength(movie.length)
        .withFormat(movie.format)
        .withGenres(mapSearchGenres(movie.genres))
        .build();
}

function mapSearchReleaseDate(date) {
    if (date !== null && date !== undefined) {
        const year = date[0];
        let month = date[1];
        let day = date[2];

        if (month < 10) {
            month = "0" + month;
        }

        if (day < 10) {
            day = "0" + day;
        }

        return year + "-" + month + "-" + day;
    }

    return null;
}

function mapSearchGenres(genres) {
    return genres.map((genre) => {
        return {
            id: null,
            name: genre
        };
    });
}

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
        "X-Authorization": this.accessToken
    });

    fetch(config.pmdb.paths.user, {headers: headers})
        .then(function (response) {
            if (!response.ok) {
                processError(response, errorCallback);
            }
            else if (successCallback !== undefined) {
                response.json().then(function (data) {
                    successCallback(data);
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            if (config.pmdb.redirectOnError) {
                window.location = config.pmdb.paths.login;
            }
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

    fetch(config.pmdb.paths.movies, {headers: headers})
        .then(function (response) {
            if (!response.ok) {
                processError(response, errorCallback);
            }
            else if (successCallback !== undefined) {
                response.json().then(function (data) {
                    successCallback(data.map(mapPmdbMovie));
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            if (config.pmdb.redirectOnError) {
                window.location = config.pmdb.paths.login;
            }
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

    fetch(config.pmdb.paths.movies, params)
        .then(function (response) {
            if (!response.ok) {
                processError(response, errorCallback);
            }
            else if (successCallback !== undefined) {
                response.json().then(function (data) {
                    successCallback(mapPmdbMovie(data));
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            if (config.pmdb.redirectOnError) {
                window.location = config.pmdb.paths.login;
            }
        });
};

MoviesResource.prototype.delete = function (movie, successCallback, errorCallback) {
    console.log("DELETE /movies/" + movie.id);

    const headers = new Headers({
        "Accept": "application/json",
        "X-Authorization": this.accessToken
    });

    const params = {
        headers: headers,
        method: "DELETE"
    };

    fetch(config.pmdb.paths.movies + "/" + movie.id, params)
        .then(function (response) {
            if (!response.ok) {
                processError(response, errorCallback);
            }
            else if (successCallback !== undefined) {
                successCallback();
            }
        })
        .catch(function (error) {
            console.log(error);
            if (config.pmdb.redirectOnError) {
                window.location = config.pmdb.paths.login;
            }
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

    fetch(config.pmdb.paths.genres, {headers: headers})
        .then(function (response) {
            if (!response.ok) {
                processError(response, errorCallback);
            }
            else if (successCallback !== undefined) {
                response.json().then(function (data) {
                    successCallback(data);
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            if (config.pmdb.redirectOnError) {
                window.location = config.pmdb.paths.login;
            }
        });
};

/**
 * RESTful resource to manage formats.
 *
 * @param accessToken
 * @constructor
 */
function FormatsResource(accessToken) {
    this.accessToken = accessToken;
}

FormatsResource.prototype.get = function (successCallback, errorCallback) {
    console.log("GET /formats");

    const headers = new Headers({
        "Accept": "application/json",
        "X-Authorization": this.accessToken
    });

    fetch(config.pmdb.paths.formats, {headers: headers})
        .then(function (response) {
            if (!response.ok) {
                processError(response, errorCallback);
            }
            else if (successCallback !== undefined) {
                response.json().then(function (data) {
                    successCallback(data);
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            if (config.pmdb.redirectOnError) {
                window.location = config.pmdb.paths.login;
            }
        });
};

/**
 * RESTful resource to search for movies.
 *
 * @type {{UsersResource: UsersResource, MoviesResource: MoviesResource, GenresResource: GenresResource}}
 */
function MovieSearchResource(accessToken) {
    this.accessToken = accessToken;
}

MovieSearchResource.prototype.search = function (title, successCallback, errorCallback) {
    console.log("GET /movie?title=" + title);

    const headers = new Headers({
        "Accept": "application/json",
        "X-Authorization": this.accessToken
    });

    const params = {
        headers: headers
    };

    fetch(config.moviesearch.paths.search + "?" + queryParams({title: title}), params)
        .then(function (response) {
            if (!response.ok) {
                processError(response, errorCallback);
            }
            else if (successCallback !== undefined) {
                response.json().then(function (data) {
                        successCallback(data.map(mapSearchMovie));
                    }
                );
            }
        })
        .catch(function (error) {
            console.log(error);
            if (config.pmdb.redirectOnError) {
                window.location = config.pmdb.paths.login;
            }
        });
};

MovieSearchResource.prototype.get = function (id, successCallback, errorCallback) {
    console.log("GET /movie/" + id);

    const headers = new Headers({
        "Accept": "application/json",
        "X-Authorization": this.accessToken
    });

    const params = {
        headers: headers
    };

    fetch(config.moviesearch.paths.details + "/" + id, params)
        .then(function (response) {
            if (!response.ok) {
                processError(response, errorCallback);
            }
            else if (successCallback !== undefined) {
                response.json().then(function (data) {
                    successCallback(mapSearchMovie(data));
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            if (config.pmdb.redirectOnError) {
                window.location = config.pmdb.paths.login;
            }
        });
};

module.exports = {
    UsersResource: UsersResource,
    MoviesResource: MoviesResource,
    GenresResource: GenresResource,
    FormatsResource: FormatsResource,
    MovieSearchResource: MovieSearchResource
};
