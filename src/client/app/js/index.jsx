"use strict";

require("../styles/app.less");

import React from "react";
import {render} from "react-dom";
import alertify from "alertify.js";
import Header from "./header.jsx";
import Menu from "./menu.jsx";
import {MovieTable, MovieFilter} from "./movie.jsx";
import {MoviesResource} from "./http.jsx";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            movies: [],
            filter: {
                title: undefined,
                genres: undefined,
                formats: undefined
            },
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
                <MovieFilter applicationState={this.state.applicationState}
                             onFilterChange={this.onFilterChanged.bind(this)}/>
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
        const filter = this.state.filter;
        filter.title = searchValue;

        this.setState({
            filter: filter
        }, this.filter);
    }

    onFilterChanged(filter) {
        const f = this.state.filter;
        f.genres = filter.genres.enabled;
        f.formats = filter.formats.enabled;

        this.setState({
            filter: f
        }, this.filter);
    }

    filter() {
        let filteredMovies = this.state.movies;

        if (this.state.filter.title !== undefined && this.state.filter.title !== "") {
            const titleFilter = this.state.filter.title.toLowerCase();
            filteredMovies = filteredMovies.filter((movie) => {
                return movie.title.toLowerCase().indexOf(titleFilter) >= 0;
            });
        }

        if (this.state.filter.genres !== undefined) {
            filteredMovies = filteredMovies.filter((movie) => {
                return App.movieMatchesGenresFilter(movie, this.state.filter.genres);
            });
        }

        if (this.state.filter.formats !== undefined) {
            filteredMovies = filteredMovies.filter((movie) => {
                return App.movieMatchesFormatsFilter(movie, this.state.filter.formats);
            });
        }

        this.setState({
            filteredMovies: filteredMovies
        });
    }

    static movieMatchesGenresFilter(movie, genres) {
        let matches = false;

        genres.forEach((genre) => {
            movie.genres.forEach((mg) => {
                if (mg.name === genre) {
                    matches = true
                }
            });
        });

        return matches;
    }

    static movieMatchesFormatsFilter(movie, formats) {
        let matches = false;

        formats.forEach((format) => {
            if (movie.format === format) {
                matches = true;
            }
        });

        return matches;
    }
}

render(<App/>, document.getElementById('app'));