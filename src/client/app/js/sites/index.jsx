"use strict";

import injectTapEventPlugin from "react-tap-event-plugin";
import React from "react";
import {render} from "react-dom";
import {Router, Route, hashHistory} from "react-router";
import MainApp from "../apps/MainApp.jsx";
import MovieListApp from "../apps/MovieListApp.jsx";
import MovieCreateApp from "../apps/MovieCreateApp.jsx";
import LoginApp from "../apps/LoginApp.jsx";

// Needed for onTouchTap, see http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
    <Router history={hashHistory}>
        <Route path="/" component={MainApp}>
            <Route path="/login" component={LoginApp}/>
            <Route path="/login/:accessToken" component={LoginApp}/>
            <Route path="/list" component={MovieListApp}/>
            <Route path="/create" component={MovieCreateApp}/>
        </Route>
    </Router>,
    document.getElementById('app')
);