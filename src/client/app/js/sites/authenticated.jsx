"use strict";

import React from "react";
import {render} from "react-dom";

import config from "../../../../../config";


class App extends React.Component {

    componentWillMount() {
        const params = {};
        const queryString = location.hash.substring(1);
        let regex = /([^&=]+)=([^&]*)/g, m;

        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        if (params["access_token"] !== undefined) {
            window.location = config.pmdb.paths.index + "/#/login/" + params["access_token"];
        } else {
            window.location = "/login.html";
        }
    }

    render() {
        return (
            <div>
                <h1>You'll be forwarded to the application.</h1>
            </div>
        )
    }
}

render(<App/>, document.getElementById('app'));
