"use strict";

import React from "react";
import {render} from "react-dom";
import unirest from "unirest";

import styles from "../styles/app.less";
import Header from "./header.jsx";
import Menu from "./menu.jsx";
import {MovieTable} from "./movie.jsx";

const App = React.createClass({

    getInitialState: function () {
        return ({
            accessToken: undefined,
            user: undefined,
            movies: [],
            filter: undefined,
            filteredMovies: []
        });
    },

    parseAccessToken: function () {
        const params = {};
        const queryString = location.hash.substring(1);
        let regex = /([^&=]+)=([^&]*)/g, m;

        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        if (params["access_token"] !== undefined) {
            this.setState({
                accessToken: params["access_token"]
            }, function () {
                this.authenticationVerified();
            });
        } else {
            window.location = "/login.html";
        }
    },

    componentDidMount: function () {
        this.parseAccessToken();

        if (this.state.accessToken !== undefined) {
            console.log("Access Token: " + this.state.accessToken);
        }
    },

    authenticationVerified: function () {
        this.updateMovies();
        this.updateUser();
    },

    render: function () {
        return (
            <div className="content">
                <Header user={this.state.user} searchListener={this.searchChanged}/>
                <Menu/>
                <MovieTable movies={this.state.filteredMovies}/>
            </div>
        );
    },

    updateMovies: function () {
        console.log("GET /movies");

        const self = this;
        const request = unirest.get('http://localhost:9000/movies');
        request.headers({
            'Accept': 'application/json',
            'X-Authorization': this.state.accessToken
        });
        request.end(function (response) {
            self.setState({
                movies: response.body
            }, function () {
                self.filter();
            });
        });
    },

    updateUser: function () {
        console.log("GET /user");

        const self = this;
        const request = unirest.get('http://localhost:9000/user');
        request.headers({
            'Accept': 'application/json',
            'X-Authorization': this.state.accessToken
        });
        request.end(function (response) {
            self.setState({
                user: response.body
            });
        });
    },

    searchChanged: function (searchValue) {
        this.setState({
            filter: searchValue
        }, function () {
            this.filter();
        })
    },

    filter: function () {
        if (this.state.filter === undefined || this.state.filter == "") {
            this.setState({
                filteredMovies: this.state.movies
            });
            return;
        }

        const filter = this.state.filter.toLowerCase();
        const newFilteredMovies = this.state.movies.filter(function (movie) {
            return movie.title.toLowerCase().indexOf(filter) >= 0;
        });

        this.setState({
            filteredMovies: newFilteredMovies
        });
    }
});

render(<App/>, document.getElementById('app'));