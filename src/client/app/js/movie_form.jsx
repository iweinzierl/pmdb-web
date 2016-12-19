"use strict";

require("../styles/app.less");

import React from "react";
import {MoviesResource} from "./http.jsx";

const MovieForm = React.createClass({

    getInitialState: function () {
        return {
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
            genres: {
                "Action": "off",
                "Comedy": "off",
                "Drama": "off",
                "Horror": "off",
                "Love": "off",
                "Sci-Fi": "off",
                "Thriller": "off"
            },
            title: "",
            length: "",
            publishDate: "",
            format: ""
        };
    },

    render: function () {
        const self = this;
        const genresOptions = this.state.genresOptions.map(function (genre) {
            return (
                <li key={genre}>
                    <input type="checkbox" name={genre} value={self.state.genres[genre]}
                           onChange={self.handleGenres}/>{genre}
                </li>
            );
        });

        const formatOptions = this.state.formatOptions.map(function (format) {
            return (
                <option key={format.value} name={format.value} value={format.value}>{format.label}</option>
            );
        });

        return (
            <div className="movie-form">
                <div className="movie-form-left">
                    <div className="movie-form-input">
                        <label>Title</label>
                        <input type="text" value={this.state.title} placeholder="Title"
                               onChange={this.handleTitle}/>
                    </div>

                    <div className="movie-form-input">
                        <label>Length</label>
                        <input type="text" value={this.state.length} placeholder="Length in minutes"
                               onChange={this.handleLength}/>
                    </div>

                    <div className="movie-form-input">
                        <label>Release Date</label>
                        <input type="text" value={this.state.publishDate}
                               placeholder="Published at (yyyy-MM-dd)" onChange={this.handlePublishDate}/>
                    </div>
                </div>
                <div className="movie-form-right">
                    <div className="movie-form-input">
                        <label>Genres</label>
                        <ul key="genres">
                            {genresOptions}
                        </ul>
                    </div>
                    <div className="movie-form-input">
                        <label>Format</label>
                        <select value={this.state.format} onChange={this.handleFormat}>
                            <option name="undefined" value="undefined">choose ...</option>
                            {formatOptions}
                        </select>
                    </div>
                </div>

                <div className="button" onClick={this.onSubmit}>
                    Save
                </div>
            </div>
        );
    },

    handleTitle: function (evt) {
        this.setState({
            title: evt.target.value
        });
    },

    handleLength: function (evt) {
        this.setState({
            length: evt.target.value
        });
    },

    handlePublishDate: function (evt) {
        this.setState({
            publishDate: evt.target.value
        });
    },

    handleFormat: function (evt) {
        this.setState({
            format: evt.target.value
        });
    },

    handleGenres: function (evt) {
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
    },

    onSubmit: function () {
        const genres = [];
        Object.entries(this.state.genres).forEach(function ([genre, selected]) {
            if (selected == "on") {
                genres.push({name: genre});
            }
        });

        const movie = {
            title: this.state.title,
            length: this.state.length,
            publishDate: this.state.publishDate,
            genres: genres,
            format: this.state.format
        };

        console.log(movie);

        new MoviesResource(this.props.applicationState.accessToken).post(
            movie,
            function (data) {
                console.log(data);
            }
        );
    }
});

export default MovieForm;
