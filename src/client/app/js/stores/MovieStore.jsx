"use strict";

import {createStore} from 'redux'

import collection from '../reducers/index.jsx';

export default createStore(collection, {
    collection: {
        movies: [],
        genres: [],
        formats: []
    },
    filter: null
});
