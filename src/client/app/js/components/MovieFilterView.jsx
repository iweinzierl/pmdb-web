"use strict";

import React from "react";
import config from "../../../../../config";

function debugEnabled() {
    return config.pmdb.debug.components && config.pmdb.debug.components.MovieFilterView;
}

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
                <GenreFilterView genres={this.props.genres} onFilterChange={this.props.onGenreFilterChanged}/>
                <FormatFilterView formats={this.props.formats} onFilterChange={this.props.onFormatFilterChanged}/>
            </div>
        );
    }

    componentWillReceiveProps() {
        if (debugEnabled()) {
            console.debug("MovieFilterView -> component will receive props -> props = ", this.props);
        }
    }
}

MovieFilterView.propTypes = {
    genres: React.PropTypes.array,
    formats: React.PropTypes.array,
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
            genres: {},
            selected: true
        };
    }

    componentWillReceiveProps() {
        if (debugEnabled()) {
            console.debug("GenreFilterView -> component will receive props -> props = ", this.props);
        }

        const genres = this.props.genres;
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

        const allText = this.state.selected
            ? "Deselect All Genres"
            : "Select All Genres";

        return (
            <div key="genre" className="filter-block">
                <a className="link" onClick={this.toggleAll.bind(this)}>{allText}</a>
                {genresList}
            </div>
        );
    }

    toggleAll() {
        const gs = {};
        Object.keys(this.state.genres).forEach((genre) => {
            gs[genre] = {
                label: genre,
                value: genre,
                checked: !this.state.selected,
                enabled: this.state.selected ? "off" : "on"
            };
        });

        this.setState({
            genres: gs,
            selected: !this.state.selected
        }, this.notify);
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
    genres: React.PropTypes.array,
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
            formats: {},
            selected: true
        };
    }

    componentWillReceiveProps() {
        if (debugEnabled()) {
            console.debug("GenreFilterView -> component will receive props -> props = ", this.props);
        }

        const self = this;
        const formats = this.props.formats;

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

        const allText = this.state.selected
            ? "Deselect All Formats"
            : "Select All Formats";

        return (
            <div key="format" className="filter-block">
                <a className="link" onClick={this.toggleAll.bind(this)}>{allText}</a>
                {formatList}
            </div>
        );
    }

    toggleAll() {
        const formats = {};
        Object.keys(this.state.formats).map((format) => {
            formats[format] = {
                label: this.state.formatLabels[format],
                value: format,
                enabled: this.state.selected ? "off" : "on",
                checked: !this.state.selected
            }
        });

        this.setState({
            formats: formats,
            selected: !this.state.selected
        }, this.notify);
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
    formats: React.PropTypes.array,
    onFilterChange: React.PropTypes.func.isRequired
};

module.exports = {
    MovieFilterView,
    GenreFilterView,
    FormatFilterView
};
