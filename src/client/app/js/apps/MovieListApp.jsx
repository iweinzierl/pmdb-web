"use strict";

require("../../styles/app.less");

import React from "react";
import MovieTable from "../components/MovieTable.jsx";
import MovieStore from "../stores/MovieStore.jsx";
import {ActionCreators} from "../actions/movies.jsx";
import {Movie} from "../domain.jsx";


class MovieListApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = MovieStore.getState();
        MovieStore.subscribe(() => {
            this.setState(MovieStore.getState());
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.addTestMovie.bind(this)}>TEST MOVIE</button>
                <MovieTable movies={this.state.movies}/>
            </div>
        );
    }

    addTestMovie() {
        MovieStore.dispatch(
            ActionCreators.MOVIE_ADD_TYPE(
                Movie.builder()
                    .withId(this.state.movies.length + 1)
                    .withTitle("Test Movie #" + (this.state.movies.length + 1))
                    .withLength(128)
                    .withReleaseDate("2016-12-31")
                    .build()
            )
        );
    }
}

export default MovieListApp;