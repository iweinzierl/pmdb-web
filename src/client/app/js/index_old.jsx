"use strict";

require("../styles/app.less");

import React from "react";
import {render} from "react-dom";

// Needed for onTouchTap, see http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import alertify from "alertify.js";

import Header from "./header.jsx";
import {MovieTable, MovieFilter} from "./movie.jsx";
import {MoviesResource} from "./http.jsx";
import {FormatsResource} from "./http.jsx";
import {GenresResource} from "./http.jsx";
import {Stats} from "./domain.jsx";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            movies: [],
            genres: [],
            formats: [],
            stats: new Stats(),
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
        this.updateFormats();
        this.updateGenres();
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="body">
                    <Header applicationState={this.state.applicationState} user={this.state.user}
                            searchListener={this.searchChanged.bind(this)}
                            stats={this.state.stats}/>
                    <div className="content">
                        <div className="movie-collection">
                            <MovieTable applicationState={this.state.applicationState}
                                        movies={this.state.filteredMovies}
                                        onMovieDeleteListener={this.deleteMovie.bind(this)}/>
                        </div>
                        <MovieFilter applicationState={this.state.applicationState}
                                     onFilterChange={this.onFilterChanged.bind(this)}/>
                    </div>
                </div>
            </MuiThemeProvider>
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
                }, () => {
                    self.filter();
                    self.updateStats();
                });
            }
        );
    }

    updateGenres() {
        const self = this;
        new GenresResource(this.state.applicationState.accessToken).get(
            (data) => {
                this.setState({
                    genres: data
                }, self.updateStats);
            }
        );
    }

    updateFormats() {
        const self = this;
        new FormatsResource(this.state.applicationState.accessToken).get(
            (data) => {
                this.setState({
                    formats: data
                }, self.updateStats);
            }
        );
    }

    updateStats() {
        const stats = Stats.builder()
            .withGenres(this.state.genres)
            .withFormats(this.state.formats)
            .withMovies(this.state.movies)
            .build();

        this.setState({
            stats: stats
        });
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