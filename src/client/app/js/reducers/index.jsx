"use strict";

import { combineReducers } from "redux";
import collection from "./collection.jsx";
import filter from "./filter.jsx";

export default combineReducers({
    filter,
    collection
});
