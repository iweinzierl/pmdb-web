"use strict";

import {createStore} from 'redux'

import users from '../reducers/users.jsx';

export default createStore(users, {
    accessToken: null,
    user: {
        name: "Max Mustermann"
    }
});
