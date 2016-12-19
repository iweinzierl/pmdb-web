"use strict";

require("../styles/app.less");

import React from "react";
import {GenresResource} from "./http.jsx";

const Menu = React.createClass({

    render: function () {
        return (
            <div className="menu">
                <div className="menu-sub">
                    <MenuItem icon="/public/ic_list_black_36dp_1x.png" title="List" route="/index.html"
                              applicationState={this.props.applicationState}/>
                    <MenuItem icon="/public/ic_create_black_36dp_1x.png" title="Create" route="/add.html"
                              applicationState={this.props.applicationState}/>
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
        window.location = this.props.route + "#access_token=" + this.props.applicationState.accessToken;
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
        new GenresResource(this.props.applicationState.accessToken).get(
            function (data) {
                if (data.length > 0) {
                    self.setState({
                        genres: data
                    });
                }
            }
        );
    },

    render: function () {
        const genresList = this.state.genres.map(function (genre) {
            const liKey = "li-" + genre;
            return (
                <li key={liKey}><input type="checkbox" name="genre" key={genre} value={genre}/>{genre}</li>
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
