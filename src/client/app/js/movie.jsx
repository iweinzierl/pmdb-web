"use strict";

import React from "react";

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
                    <MovieRow applicationState={self.props.applicationState} key={movieKey} movie={movie}
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
    onMovieClickListener: React.PropTypes.func,
    onMovieDeleteListener: React.PropTypes.func
};

/**
 * React Component to render a single row in a list of Movies.
 */
class MovieRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayActions: "none",
            style: {
                cursor: props.onMovieClickListener === undefined ? "default" : "pointer"
            }
        };
    }

    render() {
        const genres = this.props.movie.genres
            .map(function (genre) {
                return genre.name;
            })
            .join(" ");

        return (
            <div style={this.state.style} className="movie" onClick={this.onClick.bind(this)} onMouseOver={this.onMouseOver.bind(this)}
                 onMouseLeave={this.onMouseOut.bind(this)}>
                <div className="movie-content">
                    <div className="movie-cell movie-cover">
                        <img src={this.props.movie.coverUrl}/>
                    </div>
                    <div className="movie-cell movie-title">{this.props.movie.title}</div>
                    <div className="movie-cell movie-format">{this.props.movie.format}</div>
                    <div className="movie-cell movie-length">{this.props.movie.length} min</div>
                    <div className="movie-cell movie-publishdate">{this.props.movie.publishDate}</div>
                    <div className="movie-cell movie-genres">{genres}</div>
                </div>
                <MovieActionBar applicationState={this.props.applicationState} movie={this.props.movie}
                                display={this.state.displayActions}
                                onMovieDeleteListener={this.props.onMovieDeleteListener}/>
            </div>
        );
    }

    onClick() {
        if (this.props.onMovieClickListener !== undefined && this.props.onMovieClickListener !== null) {
            this.props.onMovieClickListener(this.props.movie);
        }
    }

    onMouseOver() {
        this.setState({
            displayActions: "flex"
        });
    }

    onMouseOut() {
        this.setState({
            displayActions: "none"
        });
    }
}

MovieRow.propTypes = {
    onMovieClickListener: React.PropTypes.func,
    onMovieDeleteListener: React.PropTypes.func
};

/**
 * React Component to render a group of action buttons.
 */
class MovieActionBar extends React.Component {

    render() {
        let deleteAction = null;
        if (this.props.onMovieDeleteListener !== undefined && this.props.onMovieDeleteListener !== null) {
            deleteAction = <MovieAction applicationState={this.props.applicationState}
                                        onClickListener={this.deleteMovie.bind(this)}
                                        imgSrc="http://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/btw_ic_mark_trash_black_24dp_2x.png"/>
        }
        return (
            <div className="movie-action-bar" style={{display: this.props.display}}>
                {deleteAction}
            </div>
        );
    }

    deleteMovie() {
        if (this.props.onMovieDeleteListener !== undefined && this.props.onMovieDeleteListener !== null) {
            this.props.onMovieDeleteListener(this.props.movie);
        }
    }
}

MovieActionBar.propTypes = {
    onMovieDeleteListener: React.PropTypes.func
};

/**
 * React Component to render small action buttons
 */
class MovieAction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            style: "movie-action"
        };
    }

    render() {
        return (
            <div className={this.state.style} onMouseDown={this.press.bind(this)} onMouseUp={this.release.bind(this)}
                 onMouseLeave={this.release.bind(this)} onClick={this.props.onClickListener}>
                <img draggable="false" src={this.props.imgSrc}/>
            </div>
        );
    }

    press() {
        this.setState({
            style: "movie-action movie-action-clicked"
        });
    }

    release() {
        this.setState({
            style: "movie-action"
        });
    }
}

MovieAction.propTypes = {
    onClickListener: React.PropTypes.func.isRequired
};

module.exports = {
    MovieTable: MovieTable,
    MovieRow: MovieRow,
    MovieAction: MovieAction
};
