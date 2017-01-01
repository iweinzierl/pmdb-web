"use strict";

import React from "react";
import {render} from "react-dom";
import {Router, Route, hashHistory} from 'react-router'
import MainApp from "../apps/MainApp.jsx";
import MovieListApp from "../apps/MovieListApp.jsx";
import MovieCreateApp from "../apps/MovieCreateApp.jsx";

render(
    <Router history={hashHistory}>
        <Route path="/" component={MainApp}>
            <Route path="/list" component={MovieListApp}/>
            <Route path="/create" component={MovieCreateApp}/>
        </Route>
    </Router>,
    document.getElementById('app')
);