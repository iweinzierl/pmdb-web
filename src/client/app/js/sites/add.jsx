"use strict";

require("../../styles/app.less");

import React from "react";
import {render} from "react-dom";

// Needed for onTouchTap, see http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from "../header.jsx";
import MovieForm from "../movie_form.jsx";

const App = React.createClass({

    getInitialState: function () {
        return {
            applicationState: {
                accessToken: undefined
            }
        }
    },

    parseAccessToken: function () {
        const params = {};
        const queryString = location.hash.substring(1);
        let regex = /([^&=]+)=([^&]*)/g, m;

        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        if (params["access_token"] !== undefined) {
            let applicationState = this.state.applicationState;
            applicationState.accessToken = params["access_token"];

            this.setState({
                applicationState: applicationState
            }, function () {
                this.authenticationVerified();
            });
        } else {
            window.location = "/login.html";
        }
    },

    componentWillMount: function () {
        this.parseAccessToken();
    },

    authenticationVerified: function () {
    },

    render: function () {
        return (
            <MuiThemeProvider>
                <div className="body">
                    <Header applicationState={this.state.applicationState} user={this.state.user}
                            searchListener={this.searchChanged}/>
                    <div className="content">
                        <MovieForm applicationState={this.state.applicationState}/>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
});

render(<App/>, document.getElementById('app'));
