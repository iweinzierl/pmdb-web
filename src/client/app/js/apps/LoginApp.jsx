"use strict";

require("../../styles/login.less");

import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import UserStore from "../stores/UserStore.jsx";
import {ActionCreators} from "../actions/users.jsx";
import LoginView from "../components/LoginView.jsx";
import GoogleLoginView from "../components/GoogleLoginView.jsx";
import config from "../../../../../config.js";


class LoginApp extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.params.accessToken) {
            UserStore.subscribe(() => {
                this.context.router.push("/list");
            });

            UserStore.dispatch(ActionCreators.newUserLoggedInAction(this.props.params.accessToken));
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <LoginView>
                    <GoogleLoginView onClick={this.googleLogin.bind(this)}/>
                </LoginView>
            </MuiThemeProvider>
        );
    }

    googleLogin() {
        console.debug("Login with Google");
        window.location = "" + config.google.login.baseUrl
            + "?redirect_uri=" + config.pmdb.paths.authenticated
            + "&response_type=" + config.google.login.responseType
            + "&scope=" + config.google.login.scopes.join(",")
            + "&client_id=" + config.google.login.clientId;
    }
}

LoginApp.contextTypes = {
    router: React.PropTypes.object
};

export default LoginApp;
