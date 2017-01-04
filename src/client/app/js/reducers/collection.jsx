"use strict";

import {ActionTypes} from "../actions/movies.jsx";
import {arrayAddUnique} from "../utils/DomUtils.jsx";
import config from "../../../../../config.js";

const debug = (oldState, newState) => {
    if (config.pmdb.debug.reducer.movies) {
        console.debug("Old state -->");
        console.debug(oldState);
        console.debug("New state -->");
        console.debug(newState);
    }
};

const movies = (state = {}, action) => {
    console.debug("received action -> " + action.type);
    const newState = Object.create(state);

    switch (action.type) {
        case ActionTypes.MOVIE_ADD_TYPE:
            newState.movies = state.movies.concat(action.movie);
            newState.genres = arrayAddUnique(state.genres, ...action.movie.getGenres().map((genre) => genre.name));
            newState.formats = arrayAddUnique(state.formats, action.movie.getFormat());

            debug(state, newState);
            return newState;

        case ActionTypes.MOVIES_REFRESHED_TYPE:
            let genres = [];
            let formats = [];
            console.log(genres);
            action.movies.forEach((movie) => {
                arrayAddUnique(genres, ...movie.getGenres().map((genre) => genre.name));
                arrayAddUnique(formats, movie.getFormat());

            });

            newState.movies = action.movies;
            newState.genres = genres;
            newState.formats = formats;

            debug(state, newState);
            return newState;

        case ActionTypes.MOVIE_DELETE_TYPE:
            newState.movies = state.movies.filter((movie) => {
                return movie.id === action.movie.id
            });

            debug(state, newState);
            return newState;

        default:
            return state;
    }
};

export default movies;