"use strict";

import {ActionTypes} from "../actions/movies.jsx";
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

            debug(state, newState);
            return newState;

        case ActionTypes.MOVIES_REFRESHED_TYPE:
            newState.movies = action.movies;

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