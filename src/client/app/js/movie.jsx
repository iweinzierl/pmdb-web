"use strict";

import React from "react";
import alertify from "alertify.js";

import {FormatsResource, GenresResource} from "./http.jsx";
import {Label} from "./widgets.jsx";

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
            actionBarCss: "movie-action-bar-hidden",
            style: {
                cursor: props.onMovieClickListener === undefined ? "default" : "pointer"
            },
            styleDetails: {
                display: "none"
            }
        };
    }

    render() {
        const genres = this.props.movie.genres
            .map(function (genre) {
                return (
                    <Label key={genre.name} message={genre.name}/>
                );
            });

        return (
            <div style={this.state.style} className="movie" onClick={this.onClick.bind(this)}
                 onMouseOver={this.onMouseOver.bind(this)}
                 onMouseLeave={this.onMouseOut.bind(this)}>
                <div className="movie-preview">
                    <div className="movie-cell movie-cover">
                        <img src={this.props.movie.coverUrl}/>
                    </div>
                    <div className="movie-content">
                        <div className="movie-title-desc-wrapper">
                            <div className="movie-cell movie-title">{this.props.movie.title}</div>
                            <div className="movie-cell movie-description">{this.props.movie.description}</div>
                        </div>
                        <div className="movie-meta-info-wrapper">
                            <div className="movie-cell movie-format">{this.props.movie.format}</div>
                            <div className="movie-cell movie-length">{this.props.movie.length} min</div>
                            <div className="movie-cell movie-publishdate">{this.props.movie.publishDate}</div>
                            <div className="movie-cell movie-genres">{genres}</div>
                        </div>
                        <div className="movie-cell movie-genres-mobile">{genres}</div>
                    </div>
                    <MovieActionBar applicationState={this.props.applicationState} movie={this.props.movie}
                                    css={this.state.actionBarCss}
                                    onMovieDeleteListener={this.props.onMovieDeleteListener}/>
                </div>
                <div className="movie-detail" style={this.state.styleDetails}>
                    <div className="movie-meta-info-wrapper-mobile">
                        <div className="movie-cell movie-format">{this.props.movie.format}</div>
                        <div className="movie-cell movie-length">{this.props.movie.length} min</div>
                        <div className="movie-cell movie-publishdate">{this.props.movie.publishDate}</div>
                    </div>
                    <div>
                        {this.props.movie.description}
                    </div>
                </div>
            </div>
        );
    }

    onClick() {
        if (this.props.onMovieClickListener !== undefined && this.props.onMovieClickListener !== null) {
            this.props.onMovieClickListener(this.props.movie);
        }

        const sd = this.state.styleDetails;
        sd.display = sd.display === "none" ? "flex" : "none";

        this.setState({
            styleDetails: sd
        });
    }

    onMouseOver() {
        this.setState({
            actionBarCss: "movie-action-bar movie-action-bar-visible"
        });
    }

    onMouseOut() {
        this.setState({
            actionBarCss: "movie-action-bar movie-action-bar-hidden"
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
            <div className={this.props.css}>
                {deleteAction}
            </div>
        );
    }

    deleteMovie(e) {
        e.stopPropagation();
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

/**
 * React Component to manage movie filters.
 * Filter event looks like this:
 * {
 *   genres: {
 *     enabled: { ... },
 *     disabled: { ... }
 *   },
 *   formats: {
 *     enabled: { ... },
 *     disabled: { ... }
 *   }
 * }
 */
class MovieFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            genres: undefined,
            formats: undefined
        }
    }

    render() {
        return (
            <div className="filter-group">
                <label>Filter</label>
                <GenreFilter applicationState={this.props.applicationState}
                             onFilterChange={this.genreFilterChanged.bind(this)}/>
                <FormatFilter applicationState={this.props.applicationState}
                              onFilterChange={this.formatFilterChanged.bind(this)}/>
            </div>
        );
    }

    genreFilterChanged(filter) {
        this.setState({
            genres: filter
        }, this.notify);
    }

    formatFilterChanged(filter) {
        this.setState({
            formats: filter
        }, this.notify);
    }

    notify() {
        if (this.state.genres === undefined || this.state.formats === undefined) {
            return;
        }

        this.props.onFilterChange({
            genres: this.state.genres,
            formats: this.state.formats
        });
    }
}

MovieFilter.propTypes = {
    onFilterChange: React.PropTypes.func.isRequired
};

/**
 * React Component to manage genre filters for movies.
 */
class GenreFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            genres: {}
        };
    }

    componentWillMount() {
        const self = this;
        new GenresResource(this.props.applicationState.accessToken).get(
            (genres) => {
                const gs = {};
                genres.forEach((genre) => {
                    gs[genre] = {
                        label: genre,
                        value: genre,
                        checked: true,
                        enabled: "on"
                    };
                });

                self.setState({
                    genres: gs
                }, this.notify);
            },
            (code, errorText, errorJson) => {
                alertify.error("Operation failed -> http code " + code);
                console.error(errorText !== null ? errorText : errorJson);
            }
        );
    }

    render() {
        const self = this;
        const genresList = [];
        Object.entries(this.state.genres).forEach(function ([genre, state]) {
            genresList.push(
                <div key={state.value} className="filter-item">
                    <input type="checkbox" name={state.value} key={state.value}
                           checked={self.state.genres[genre].checked}
                           value={self.state.genres[genre].enabled}
                           onChange={self.onGenresChange.bind(self)}/>
                    {state.label}
                </div>
            );
        });

        return (
            <div key="genre" className="filter-block">
                {genresList}
            </div>
        );
    }

    onGenresChange(evt) {
        const gs = this.state.genres;
        gs[evt.target.name].enabled = evt.target.value === "on" ? "off" : "on";
        gs[evt.target.name].checked = !gs[evt.target.name].checked;

        this.setState({
            genres: gs
        }, this.notify);
    }

    notify() {
        const enabled = [];
        const disabled = [];

        Object.entries(this.state.genres).forEach(([genre, state]) => {
            if (state.checked) {
                enabled.push(genre);
            }
            else {
                disabled.push(genre);
            }
        });

        this.props.onFilterChange({
            enabled: enabled,
            disabled: disabled
        });
    }
}

GenreFilter.propTypes = {
    onFilterChange: React.PropTypes.func.isRequired
};

/**
 * React Component to manage format filters for movies.
 */
class FormatFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formatLabels: {
                "DVD": "DVD",
                "BLURAY": "BLU-RAY",
                "VHS": "VHS",
                "AMAZON_VIDEO": "Amazon Video",
                "GOOGLE_MOVIES": "Google Movies"
            },
            formats: {
                "VHS": {label: "VHS", value: "VHS", checked: true, enabled: "on"},
                "DVD": {label: "DVD", value: "DVD", checked: true, enabled: "on"},
                "BLURAY": {label: "BLU-RAY", value: "BLURAY", checked: true, enabled: "on"}
            }
        };
    }

    componentWillMount() {
        const self = this;
        new FormatsResource(this.props.applicationState.accessToken).get(
            (formats) => {
                const fs = {};
                formats.forEach((format) => {
                    fs[format] = {
                        label: this.state.formatLabels[format],
                        value: format,
                        checked: true,
                        enabled: "on"
                    };
                });

                self.setState({
                    formats: fs
                }, this.notify);
            },
            (code, errorText, errorJson) => {
                alertify.error("Operation failed -> http code " + code);
                console.error(errorText !== null ? errorText : errorJson);
            }
        );
    }

    render() {
        const self = this;
        const formatList = [];
        Object.entries(this.state.formats).forEach(function ([format, state]) {
            formatList.push(
                <div key={state.value} className="filter-item">
                    <input type="checkbox" name={state.value} key={state.value}
                           checked={self.state.formats[format].checked}
                           value={self.state.formats[format].enabled}
                           onChange={self.onFormatChange.bind(self)}/>
                    {state.label}
                </div>
            );
        });

        return (
            <div key="format" className="filter-block">
                {formatList}
            </div>
        );
    }

    onFormatChange(evt) {
        const fs = this.state.formats;
        fs[evt.target.name].enabled = evt.target.value === "on" ? "off" : "on";
        fs[evt.target.name].checked = !fs[evt.target.name].checked;

        this.setState({
            formats: fs
        }, this.notify);
    }

    notify() {
        const enabled = [];
        const disabled = [];

        Object.entries(this.state.formats).forEach(([format, state]) => {
            if (state.checked) {
                enabled.push(format);
            }
            else {
                disabled.push(format);
            }
        });

        this.props.onFilterChange({
            enabled: enabled,
            disabled: disabled
        });
    }
}

FormatFilter.propTypes = {
    onFilterChange: React.PropTypes.func.isRequired
};

module.exports = {
    MovieTable: MovieTable,
    MovieRow: MovieRow,
    MovieAction: MovieAction,
    MovieFilter: MovieFilter
};
