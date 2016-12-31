"use strict";

import {createStore} from 'redux'

import movies from '../reducers/index.jsx';

export default createStore(movies, {
    movies: [],
    filter: null
});
