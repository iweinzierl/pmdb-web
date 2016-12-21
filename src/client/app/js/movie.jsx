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
                return (
                    <MovieRow applicationState={self.props.applicationState} key={movie.id} movie={movie}
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

MovieTable.defaultProps = {
    onMovieClickListener: () => {
    },
    onMovieDeleteListener: () => {
    }
};

/**
 * React Component to render a single row in a list of Movies.
 */
class MovieRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayActions: "none"
        };
    }

    render() {
        const genres = this.props.movie.genres
            .map(function (genre) {
                return genre.name;
            })
            .join(" ");

        return (
            <div className="movie" onClick={this.onClick.bind(this)} onMouseOver={this.onMouseOver.bind(this)}
                 onMouseLeave={this.onMouseOut.bind(this)}>
                <div className="movie-content">
                    <div className="movie-title">{this.props.movie.title}</div>
                    <div className="movie-format">{this.props.movie.format}</div>
                    <div className="movie-length">{this.props.movie.length} min</div>
                    <div className="movie-publishdate">{this.props.movie.publishDate}</div>
                    <div className="movie-genres">{genres}</div>
                </div>
                <MovieActionBar applicationState={this.props.applicationState} movie={this.props.movie}
                                display={this.state.displayActions}
                                onMovieDeleteListener={this.props.onMovieDeleteListener}/>
            </div>
        );
    }

    onClick() {
        this.props.onMovieClickListener(this.props.movie);
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

MovieRow.defaultProps = {
    onMovieClickListener: () => {
    },
    onMovieDeleteListener: () => {
    }
};

/**
 * React Component to render a group of action buttons.
 */
class MovieActionBar extends React.Component {

    render() {
        return (
            <div className="movie-action-bar" style={{display: this.props.display}}>
                <MovieAction applicationState={this.props.applicationState}
                             onClickListener={this.deleteMovie.bind(this)}
                             imgSrc="http://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/btw_ic_mark_trash_black_24dp_2x.png"/>
            </div>
        );
    }

    deleteMovie() {
        this.props.onMovieDeleteListener(this.props.movie);
    }
}

MovieActionBar.propTypes = {
    onMovieDeleteListener: React.PropTypes.func
};

MovieActionBar.defaultProps = {
    onMovieDeleteListener: () => {
    }
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
