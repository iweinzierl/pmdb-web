"use strict";

require("../styles/app.less");

import React from "react";
import {render} from "react-dom";

import alertify from "alertify.js";

import Header from "./header.jsx";
import Menu from "./menu.jsx";
import {MovieTable} from "./movie.jsx";
import {MoviesResource} from "./http.jsx";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            movies: [],
            filter: undefined,
            filteredMovies: [],
            applicationState: {
                accessToken: undefined
            }
        };
    }

    parseAccessToken() {
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
    }

    componentWillMount() {
        this.parseAccessToken();
    }

    authenticationVerified() {
        this.updateMovies();
    }

    render() {
        return (
            <div className="content">
                <Header applicationState={this.state.applicationState} user={this.state.user}
                        searchListener={this.searchChanged.bind(this)}/>
                <Menu applicationState={this.state.applicationState}/>
                <MovieTable applicationState={this.state.applicationState} movies={this.state.filteredMovies}
                            onMovieDeleteListener={this.deleteMovie.bind(this)}/>
            </div>
        );
    }

    deleteMovie(movie) {
        const self = this;
        alertify.confirm(
            "Really delete movie '" + movie.title + "'?",
            () => {
                new MoviesResource(self.state.applicationState.accessToken).delete(
                    movie,
                    () => {
                        const updatedMovieList = this.state.movies.filter((current) => {
                            return current.id != movie.id
                        });

                        this.setState({
                            movies: updatedMovieList
                        }, () => self.filter());

                        alertify.success("Successfully deleted movie.");
                    }
                );
            }
        );
    }

    updateMovies() {
        const self = this;
        new MoviesResource(this.state.applicationState.accessToken).get(
            function (data) {
                self.setState({
                    movies: data
                }, function () {
                    self.filter();
                });
            }
        );
    }

    searchChanged(searchValue) {
        this.setState({
            filter: searchValue
        }, function () {
            this.filter();
        })
    }

    filter() {
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
}

render(<App/>, document.getElementById('app'));