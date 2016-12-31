"use strict";

import {createStore} from 'redux'

import users from '../reducers/users.jsx';

export default createStore(users, {
    user: {
        name: "Max Mustermann"
    }
});
