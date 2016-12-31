"use strict";

const MOVIES_ADD_TYPE = "ADD_MOVIES";
const MOVIE_ADD_TYPE = "ADD_MOVIE";
const MOVIE_DELETE_TYPE = "DELETE_MOVIE";

const newAddMoviesAction = (movies) => {
    return {
        type: MOVIES_ADD_TYPE,
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
        MOVIES_ADD_TYPE: MOVIES_ADD_TYPE,
        MOVIE_ADD_TYPE: MOVIE_ADD_TYPE,
        MOVIE_DELETE_TYPE: MOVIE_DELETE_TYPE
    },
    ActionCreators: {
        MOVIES_ADD_TYPE: newAddMoviesAction,
        MOVIE_ADD_TYPE: newAddMovieAction,
        MOVIE_DELETE_TYPE: newDeleteMovieAction
    }
};

