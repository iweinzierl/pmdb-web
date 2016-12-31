"use strict";

import {ActionTypes} from "../actions/movies.jsx";

const debug = (oldState, newState) => {
    console.debug("Old state -->");
    console.debug(oldState);
    console.debug("New state -->");
    console.debug(newState);
};

const movies = (state = {}, action) => {
    console.debug("received action -> " + action.type);
    const newState = Object.create(state);

    switch (action.type) {
        case ActionTypes.MOVIE_ADD_TYPE:
            newState.movies = state.movies.concat(action.movie);

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