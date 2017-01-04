"use strict";

import React from "react";

class StatsView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="stats">
                <div className="stats-item">
                    Number of movies: {this.props.stats.getNumberOfMovies()}
                </div>
                <div className="stats-item">
                    Number of formats: {this.props.stats.getNumberOfFormats()}
                </div>
                <div className="stats-item">
                    Number of genres: {this.props.stats.getNumberOfGenres()}
                </div>
            </div>
        );
    }
}

StatsView.propTypes = {
    stats: React.PropTypes.object.isRequired
};

export default StatsView;
