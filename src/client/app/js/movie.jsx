"use strict";

import React from "react";

const MovieTable = React.createClass({

    render: function () {
        const movieRows = this.props.movies.map(function (movie) {
            return (
                <MovieRow key={movie.id} movie={movie}/>
            );
        });
        return (
            <div className="movie-table">
                {movieRows}
            </div>
        );
    }
});

const MovieRow = React.createClass({

    render: function () {
        return (
            <div className="movie">
                <div className="movie-title">{this.props.movie.title}</div>
                <div className="movie-format">{this.props.movie.format}</div>
                <div className="movie-length">{this.props.movie.length}</div>
                <div className="movie-publishdate">{this.props.movie.publishDate}</div>
                <div className="movie-genres">{this.props.movie.genres}</div>
            </div>
        );
    }
});

module.exports = {
    MovieTable: MovieTable,
    MovieRow: MovieRow
};
