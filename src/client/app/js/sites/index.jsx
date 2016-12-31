"use strict";

import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import App from "../apps/MovieListApp.jsx";

render(
    <App />,
    document.getElementById('app')
);