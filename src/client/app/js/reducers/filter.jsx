"use strict";

import {ActionTypes} from "../actions/filters.jsx";
import {MovieFilter} from "../domain.jsx";
import config from "../../../../../config.js";


const debug = (oldNew, state) => {
    if (config.pmdb.debug.reducer.filter) {
        console.debug(oldNew + " state -->");
        console.debug(state);
    }
};

const filters = (state = {}, action) => {
    console.debug("received action -> " + action.type);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case ActionTypes.FILTER_TITLE_UPDATE_TYPE:
            debug("Old", state);

            newState.filter = MovieFilter.builder()
                .withTitleFilter(action.title)
                .withGenresFilter(state !== null && state.filter ? state.filter.getGenresFilter() : null)
                .withFormatsFilter(state !== null && state.filter ? state.filter.getFormatsFilter() : null)
                .build();

            debug("New", newState);

            return newState;

        default:
            return state;
    }
};

export default filters;
