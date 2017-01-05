"use strict";

import React from "react";
import MovieStore from "../stores/MovieStore.jsx";

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
class MovieFilterView extends React.Component {

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
                <GenreFilterView onFilterChange={this.props.onGenreFilterChanged}/>
                <FormatFilterView onFilterChange={this.props.onFormatFilterChanged}/>
            </div>
        );
    }
}

MovieFilterView.propTypes = {
    onGenreFilterChanged: React.PropTypes.func.isRequired,
    onFormatFilterChanged: React.PropTypes.func.isRequired
};

/**
 * React Component to manage genre filters for movies.
 */
class GenreFilterView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            genres: {}
        };
    }

    componentWillMount() {
        MovieStore.subscribe(() => {
            const genres = MovieStore.getState().collection.genres;
            if (genres && genres.length != Object.keys(this.state.genres).length) {
                const gs = {};
                genres.forEach((genre) => {
                    gs[genre] = {
                        label: genre,
                        value: genre,
                        checked: true,
                        enabled: "on"
                    };
                });

                this.setState({genres: gs});
            }
        });
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

GenreFilterView.propTypes = {
    onFilterChange: React.PropTypes.func.isRequired
};

/**
 * React Component to manage format filters for movies.
 */
class FormatFilterView extends React.Component {

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
            formats: {}
        };
    }

    componentWillMount() {
        const self = this;
        MovieStore.subscribe(() => {
            const formats = MovieStore.getState().collection.formats;

            if (formats && formats.length != Object.keys(this.state.formats).length) {
                const fs = {};
                formats.forEach((format) => {
                    fs[format] = {
                        label: this.state.formatLabels[format],
                        value: format,
                        checked: true,
                        enabled: "on"
                    };

                    self.setState({formats: fs});
                });
            }
        });
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

FormatFilterView.propTypes = {
    onFilterChange: React.PropTypes.func.isRequired
};

module.exports = {
    MovieFilterView,
    GenreFilterView,
    FormatFilterView
};
