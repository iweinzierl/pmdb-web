"use strict";

import React from "react";

import MovieView from "./MovieView.jsx";


/**
 * React Component to render a list of Movies.
 */
class MovieTable extends React.Component {

    render() {
        const self = this;
        let movieRows = [];

        if (this.props.movies !== undefined) {
            movieRows = this.props.movies.map(function (movie) {
                const movieKey = movie.id + "#" + movie.title;

                return (
                    <MovieView applicationState={self.props.applicationState} key={movieKey} movie={movie}
                               onMovieClickListener={self.props.onMovieClickListener}
                               onMovieDeleteListener={self.props.onMovieDeleteListener}/>
                );
            });
        }

        return (
            <div className="movie-table">
                {movieRows}
            </div>
        );
    }
}

MovieTable.propTypes = {
    movies: React.PropTypes.arrayOf(React.PropTypes.object),
    onMovieClickListener: React.PropTypes.func,
    onMovieDeleteListener: React.PropTypes.func
};

export default MovieTable;