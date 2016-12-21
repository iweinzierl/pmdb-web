"use strict";

const config = require("../../../../config.json");

import React from "react";
import {render} from "react-dom";

const LoginButton = React.createClass({

    getInitialState: function () {
        return {
            baseUrl: "https://accounts.google.com/o/oauth2/v2/auth",
            redirectUri: config.pmdb.paths.index,
            clientId: "590281041484-kfh0l2a24qmvpt2b9f8d2gr16jt1stek.apps.googleusercontent.com",
            scopes: [
                "email"
            ]
        };
    },

    render: function () {
        return (
            <button onClick={this.login}>Google Login</button>
        );
    },

    login: function () {
        const url = "" + this.state.baseUrl
            + "?redirect_uri=" + this.state.redirectUri
            + "&response_type=token"
            + "&scope=email"
            + "&client_id=" + this.state.clientId;

        window.location = url;
    }
});

export default LoginButton;
