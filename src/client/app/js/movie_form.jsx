"use strict";

require("../styles/app.less");

import React from "react";
import alertify from "alertify.js";
import pretty from "js-object-pretty-print";

import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

import {MovieTable} from "./movie.jsx";
import {MoviesResource} from "./http.jsx";
import {MovieSearchResource} from "./http.jsx";

class MovieForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
                           onChange={self.handleGenres.bind(self)}/>
                    <span>{genre}</span>
                </div>
            );
        });

        const formatOptions = this.state.formatOptions.map(function (format) {
            return (
                <MenuItem key={format.value} value={format.value} primaryText={format.label}/>
            );
        });

        return (
            <div className="movie-form-wrapper">
                <div className="movie-form">

                    <div className="movie-form-side">
                        <div className="movie-form-input">
                            <label>Title</label>
                            <TextField value={this.state.title} hintText="Title" onChange={this.handleTitle.bind(this)}
                                       onKeyPress={this.handleTitleEnter.bind(this)} fullWidth={true}/>
                        </div>

                        <div className="movie-form-input">
                            <label>Length</label>
                            <TextField value={this.state.length} fullWidth={true} hintText="Length in minutes"
                                       onChange={this.handleLength.bind(this)}/>
                        </div>

                        <div className="movie-form-input">
                            <label>Release Date</label>
                            <TextField value={this.state.publishDate} fullWidth={true}
                                       hintText="Published at (yyyy-MM-dd)"
                                       onChange={this.handlePublishDate.bind(this)}/>
                        </div>

                        <div className="movie-form-input">
                            <label>Description</label>
                            <TextField value={this.state.description} fullWidth={true}
                                       onChange={this.handleDescription.bind(this)}
                                       multiLine={true}/>
                        </div>
                    </div>

                    <div className="movie-form-side">
                        <div className="movie-form-input">
                            <label>Cover URL</label>
                            <TextField value={this.state.coverUrl} fullWidth={true} hintText="http://cover.movie.org"
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
                            <SelectField value={this.state.format} onChange={this.handleFormat.bind(this)} fullWidth={true}>
                                <MenuItem key="undefined" value="undefined" primaryText="choose ..."/>
                                {formatOptions}
                            </SelectField>
                        </div>
                    </div>
                </div>

                <div className="movie-form-buttons">
                    <div className="button" onClick={this.onSubmit.bind(this)}>
                        Save
                    </div>

                    <div className="button" onClick={this.search.bind(this)}>
                        Search
                    </div>

                    <div className="button" onClick={this.reset.bind(this)}>
                        Reset
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
        this.reset();

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
        movie.getGenres().forEach(function (genre) {
            genres[genre.name] = {
                value: "on",
                checked: true
            };

            if (genresOptions.indexOf(genre.name) < 0) {
                genresOptions.push(genre.name);
            }
        });

        this.setState({
            title: movie.getTitle(),
            publishDate: movie.getReleaseDate(),
            length: movie.getLength(),
            genres: genres,
            genresOptions: genresOptions,
            coverUrl: movie.getCoverUrl(),
            description: movie.getDescription()
        });
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

    handleFormat(evt, index, value) {
        this.setState({
            format: value
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

    reset() {
        const genres = {};
        Object.keys(this.state.genres).forEach((genre) => {
            genres[genre] = {
                value: "off",
                checked: false
            };
        });

        this.setState({
            genres: genres,
            title: "",
            length: "",
            publishDate: "",
            format: "",
            description: "",
            coverUrl: ""
        });
    }
}

export default MovieForm;
