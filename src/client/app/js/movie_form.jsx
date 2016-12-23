"use strict";

require("../styles/app.less");

import React from "react";
import alertify from "alertify.js";
import pretty from "js-object-pretty-print";

import {MovieTable} from "./movie.jsx";
import {MoviesResource} from "./http.jsx";
import {MovieSearchResource} from "./http.jsx";

class MovieForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: {
                content: "",
                open: false
            },
            genresOptions: [
                "Action",
                "Comedy",
                "Drama",
                "Horror",
                "Love",
                "Sci-Fi",
                "Thriller"
            ],
            formatOptions: [
                {value: "VHS", label: "VHS"},
                {value: "DVD", label: "DVD"},
                {value: "BLURAY", label: "BLU-RAY"},
                {value: "AMAZON_VIDEO", label: "Amazon Video"},
                {value: "GOOGLE_MOVIES", label: "Google Movies"}
            ],
            suggestions: [],
            genres: {
                "Action": {
                    value: "off",
                    checked: false
                },
                "Comedy": {
                    value: "off",
                    checked: false
                },
                "Drama": {
                    value: "off",
                    checked: false
                },
                "Horror": {
                    value: "off",
                    checked: false
                },
                "Love": {
                    value: "off",
                    checked: false
                },
                "Sci-Fi": {
                    value: "off",
                    checked: false
                },
                "Thriller": {
                    value: "off",
                    checked: false
                }
            },
            title: "",
            length: "",
            publishDate: "",
            format: "",
            description: "",
            coverUrl: ""
        };
    }

    render() {
        const self = this;
        const genresOptions = this.state.genresOptions.map(function (genre) {
            return (
                <div key={genre}>
                    <input type="checkbox" name={genre} value={self.state.genres[genre].value}
                           checked={self.state.genres[genre].checked}
                           onChange={self.handleGenres}/>
                    <span>{genre}</span>
                </div>
            );
        });

        const formatOptions = this.state.formatOptions.map(function (format) {
            return (
                <option key={format.value} name={format.value} value={format.value}>{format.label}</option>
            );
        });

        return (
            <div className="movie-form-wrapper">
                <div className="movie-form">

                    <div className="movie-form-side">
                        <div className="movie-form-input">
                            <label>Title</label>
                            <input type="text" value={this.state.title} placeholder="Title"
                                   onChange={this.handleTitle.bind(this)}
                                   onKeyPress={this.handleTitleEnter.bind(this)}/>
                        </div>

                        <div className="movie-form-input">
                            <label>Length</label>
                            <input type="text" value={this.state.length} placeholder="Length in minutes"
                                   onChange={this.handleLength.bind(this)}/>
                        </div>

                        <div className="movie-form-input">
                            <label>Release Date</label>
                            <input type="text" value={this.state.publishDate}
                                   placeholder="Published at (yyyy-MM-dd)"
                                   onChange={this.handlePublishDate.bind(this)}/>
                        </div>

                        <div className="movie-form-input">
                            <label>Description</label>
                            <textarea value={this.state.description} onChange={this.handleDescription.bind(this)}/>
                        </div>
                    </div>

                    <div className="movie-form-side">
                        <div className="movie-form-input">
                            <label>Cover URL</label>
                            <input type="text" value={this.state.coverUrl} placeholder="http://cover.movie.org"
                                   onChange={this.handleCoverUrl.bind(this)}/>
                        </div>
                        <div className="movie-form-cover">
                            <img src={this.state.coverUrl}/>
                        </div>
                        <div className="movie-form-genres">
                            <label>Genres</label>
                            <div className="movie-form-genres-options">
                                {genresOptions}
                            </div>
                        </div>
                        <div className="movie-form-input">
                            <label>Format</label>
                            <select value={this.state.format} onChange={this.handleFormat.bind(this)}>
                                <option name="undefined" value="undefined">choose ...</option>
                                {formatOptions}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="movie-form-buttons">
                    <div className="button" onClick={this.search.bind(this)}>
                        Search
                    </div>

                    <div className="button" onClick={this.onSubmit.bind(this)}>
                        Save
                    </div>
                </div>

                <div className="movie-form-suggestions">
                    <MovieTable movies={this.state.suggestions}
                                onMovieClickListener={this.onSuggestionClicked.bind(this)}/>
                </div>
            </div>
        );
    }

    onSuggestionClicked(movie) {
        const self = this;

        new MovieSearchResource(this.props.applicationState.accessToken).get(
            movie.id,
            function (movieDetails) {
                self.applySuggestion(movieDetails);
            }
        );
    }

    applySuggestion(movie) {
        const genresOptions = this.state.genresOptions;
        const genres = this.state.genres;
        movie.genres.forEach(function (genre) {
            genres[genre] = {
                value: "on",
                checked: true
            };

            if (genresOptions.indexOf(genre) < 0) {
                genresOptions.push(genre);
            }
        });

        this.setState({
            title: movie.title,
            publishDate: MovieForm.convertPublishDate(movie.published),
            length: movie.length,
            genres: genres,
            genresOptions: genresOptions,
            coverUrl: movie.coverUrl,
            description: movie.description
        });
    }

    static convertPublishDate(publishDate) {
        if (publishDate === undefined || publishDate === null || typeof publishDate !== "object" || publishDate.length < 3) {
            return "";
        }

        const month = publishDate[1] < 10 ? "0" + publishDate[1] : publishDate[1];
        const day = publishDate[2] < 10 ? "0" + publishDate[2] : publishDate[2];

        return publishDate[0] + "-" + month + "-" + day;
    }

    handleTitleEnter(evt) {
        if (evt.key === 'Enter') {
            this.search();
        }
    }

    handleTitle(evt) {
        this.setState({
            title: evt.target.value
        });
    }

    handleLength(evt) {
        this.setState({
            length: evt.target.value
        });
    }

    handlePublishDate(evt) {
        this.setState({
            publishDate: evt.target.value
        });
    }

    handleDescription(evt) {
        this.setState({
            description: evt.target.value
        });
    }

    handleFormat(evt) {
        this.setState({
            format: evt.target.value
        });
    }

    handleGenres(evt) {
        const genres = this.state.genres;

        if (evt.target.value == "off") {
            genres[evt.target.name] = "on";
        }
        else {
            genres[evt.target.name] = "off";
        }

        this.setState({
            genres: genres
        });
    }

    handleCoverUrl(evt) {
        this.setState({
            coverUrl: evt.target.value
        });
    }

    onSubmit() {
        const self = this;
        const genres = [];
        Object.entries(this.state.genres).forEach(function ([genre, state]) {
            if (state.value == "on") {
                genres.push({name: genre});
            }
        });

        const movie = {
            title: this.state.title,
            length: this.state.length,
            publishDate: this.state.publishDate,
            genres: genres,
            format: this.state.format,
            coverUrl: this.state.coverUrl,
            description: this.state.description
        };

        new MoviesResource(this.props.applicationState.accessToken).post(
            movie,
            (data) => {
                alertify.success("Movie added!");
            },
            (code, errorText, errorJson) => {
                const details = errorJson === null ? errorText : pretty.pretty(errorJson, 4, "HTML");
                alertify.alert("Operation failed -> http code " + code + "br/>" + details);
            }
        );
    }

    search() {
        const self = this;

        alertify.log("Searching for movie...");

        new MovieSearchResource(this.props.applicationState.accessToken).search(
            this.state.title,
            function (movies) {
                self.setState({
                    suggestions: movies
                }, function () {
                    alertify.log("Suggestions loaded.");
                });
            }
        );
    }
}

export default MovieForm;
