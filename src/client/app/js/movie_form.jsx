import React from "react";
import {render} from "react-dom";
import {Creatable} from "react-select";
import "react-select/dist/react-select.css";

require("../styles/app.less");

const MovieForm = React.createClass({
    getInitialState: function () {
        return {
            genres: [
                {value: "Action", label: "Action"},
                {value: "Comedy", label: "Comedy"},
                {value: "Horror", label: "Horror"},
                {value: "Thriller", label: "Thriller"}
            ],
            movie: {
                title: "",
                genres: "",
                length: "",
                format: "",
                publishDate: ""
            },
            multi: true
        };
    },

    componentDidMount: function () {
        const self = this;
        fetch('/genres')
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Error while loading genres from server -> http status ' +
                            response.status);
                        return;
                    }

                    response.json().then(function (data) {
                        self.setState({
                            genres: data.map(function (genre) {
                                return {value: genre, label: genre};
                            })
                        });
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    },

    handleOnChange: function (value) {
        var movie = this.state.movie;
        movie.genres = value;
        this.setState({movie: movie});
    },

    onSubmit: function () {
        console.log("Title: " + self.title)
    },

    render: function () {
        const {genres, movie, multi} = this.state;
        return (
            <div className="movie-form">

                <div className="movie-form-input">
                    <input type="text" value={this.state.movie.title} placeholder="Title"/>
                </div>

                <div className="movie-form-input">
                    <input type="text" value={this.state.movie.length} placeholder="Length in minutes"/>
                </div>

                <div className="movie-form-input">
                    <input type="text" value={this.state.movie.publishDate} placeholder="Published at (yyyy-MM-dd)"/>
                </div>

                <div className="movie-form-input">
                    <Creatable options={genres} multi={multi} value={this.state.movie.genres}
                               onChange={this.handleOnChange}/>
                </div>

                <div className="movie-form-input">
                    <select value={this.state.movie.format}>
                        <option>Format</option>
                        <option>VHS</option>
                        <option>DVD</option>
                        <option>BLU-RAY</option>
                    </select>
                </div>

                <input type="submit" value="Save" onClick={this.onSubmit}/>
            </div>
        );
    }
});

export default MovieForm;
