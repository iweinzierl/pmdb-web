"use strict";

import { combineReducers } from "redux";
import movies from "./movies.jsx";
import filter from "./filter.jsx";

export default combineReducers({
    filter,
    movies
});
