"use strict";

const MOVIES_REFRESHED_TYPE = "REFRESHED_MOVIES";
const MOVIE_ADD_TYPE = "ADD_MOVIE";
const MOVIE_DELETE_TYPE = "DELETE_MOVIE";

const newRefreshedMoviesAction = (movies) => {
    return {
        type: MOVIES_REFRESHED_TYPE,
        movies: movies
    };
};

const newAddMovieAction = (movie) => {
    return {
        type: MOVIE_ADD_TYPE,
        movie: movie
    };
};

const newDeleteMovieAction = (movie) => {
    return {
        type: MOVIE_DELETE_TYPE,
        movie: movie
    };
};

module.exports = {
    ActionTypes: {
        MOVIES_REFRESHED_TYPE: MOVIES_REFRESHED_TYPE,
        MOVIE_ADD_TYPE: MOVIE_ADD_TYPE,
        MOVIE_DELETE_TYPE: MOVIE_DELETE_TYPE
    },
    ActionCreators: {
        newRefreshedMoviesAction: newRefreshedMoviesAction,
        newAddMovieAction: newAddMovieAction,
        newDeleteMovieAction: newDeleteMovieAction
    }
};

