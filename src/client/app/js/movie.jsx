"use strict";

import React from "react";

const MovieTable = React.createClass({

    render: function () {
        const self = this;
        let movieRows = [];

        if (this.props.movies !== undefined) {
            movieRows = this.props.movies.map(function (movie) {
                return (
                    <MovieRow key={movie.id} movie={movie} onMovieClickListener={self.onMovieClick}/>
                );
            });
        }

        return (
            <div className="movie-table">
                {movieRows}
            </div>
        );
    },

    onMovieClick: function (movie) {
        if (this.props.onMovieClickListener !== undefined) {
            this.props.onMovieClickListener(movie);
        }
    }
});

const MovieRow = React.createClass({

    render: function () {
        const genres = this.props.movie.genres
            .map(function (genre) {
                return genre.name;
            })
            .join(" ");

        return (
            <div className="movie" onClick={this.onMovieClick}>
                <div className="movie-title">{this.props.movie.title}</div>
                <div className="movie-format">{this.props.movie.format}</div>
                <div className="movie-length">{this.props.movie.length} min</div>
                <div className="movie-publishdate">{this.props.movie.publishDate}</div>
                <div className="movie-genres">{genres}</div>
            </div>
        );
    },

    onMovieClick: function () {
        if (this.props.onMovieClickListener !== undefined) {
            this.props.onMovieClickListener(this.props.movie);
        }
    }
});

module.exports = {
    MovieTable: MovieTable,
    MovieRow: MovieRow
};
