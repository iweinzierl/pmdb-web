"use strict";

import {ActionTypes} from "../actions/users.jsx";
import config from "../../../../../config.js";

const debug = (oldState, newState) => {
    if (config.pmdb.debug.reducer.user) {
        console.debug("Old state -->");
        console.debug(oldState);
        console.debug("New state -->");
        console.debug(newState);
    }
};

const users = (state = {}, action) => {
    console.debug("received action -> " + action.type);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case ActionTypes.USER_LOGGED_IN_TYPE:
            newState.accessToken = action.accessToken;

            debug(state, newState);
            return newState;

        case ActionTypes.REFRESHED_CURRENT_USER_TYPE:
            newState.user = action.user;

            debug(state, newState);
            return newState;

        default:
            return state;
    }
};

export default users;
