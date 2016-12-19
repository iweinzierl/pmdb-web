"use strict";

import React from "react";
import unirest from "unirest";

const Menu = React.createClass({

    render: function () {
        return (
            <div className="menu">
                <div className="menu-sub">
                    <MenuItem icon="/public/ic_list_black_36dp_1x.png" title="List"/>
                    <MenuItem icon="/public/ic_create_black_36dp_1x.png" title="Create"/>
                </div>
                <div className="menu-sub">
                    <GenreFilter applicationState={this.props.applicationState}/>
                </div>
                <div className="menu-sub">
                    <FormatFilter applicationState={this.props.applicationState}/>
                </div>
            </div>
        );
    }
});

const MenuItem = React.createClass({

    render: function () {
        return (
            <div className="menu-item" onClick={this.select}>
                <img src={this.props.icon}/>
                <span>{this.props.title}</span>
            </div>
        );
    },

    select: function () {
        this.setState({
            css: "menu-item-selected"
        })
    }
});

const GenreFilter = React.createClass({

    getInitialState: function () {
        return {
            genres: [
                "Action",
                "Comedy",
                "Drama",
                "Horror",
                "Love",
                "Sci-Fi",
                "Thriller"
            ]
        }
    },

    componentDidMount: function () {
        const self = this;
        const request = unirest.get("http://localhost:9000/genres");
        request.headers({
            "Accept": "application/json",
            "X-Authorization": this.props.applicationState.accessToken
        });
        request.end(function (response) {
            if (response.body === undefined) {
                return;
            }

            const genres = response.body.map(function (genre) {
                return genre.name;
            });

            if (genres.length > 0) {
                self.setState({
                    genres: genres
                });
            }
        });
    },

    render: function () {
        const genresList = this.state.genres.map(function (genre) {
            return (
                <li key={genre}><input type="checkbox" name="genre" value={genre}/>{genre}</li>
            );
        });

        return (
            <ul key="genres">
                {genresList}
            </ul>
        );
    }
});

const FormatFilter = React.createClass({

    getInitialState: function () {
        return {
            format: [
                "DVD",
                "BLU-RAY",
                "VHS",
                "Amazon Prime",
                "Google Movies"
            ]
        }
    },

    render: function () {
        const self = this;
        const formatList = this.state.format.map(function (format) {
            return (
                <li key={format}>
                    <input type="checkbox" checked="checked" name="format" key={format} value={format}
                           onChange={self.onFormatChange}/>
                    {format}
                </li>
            );
        });

        return (
            <ul key="format">
                {formatList}
            </ul>
        );
    },

    onFormatChange: function (evt) {
        console.log(evt);
    }
});

export default Menu;
