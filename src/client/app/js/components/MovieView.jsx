"use strict";

require("../../styles/movie.less");

import React from "react";


/**
 * React Component to render a single row in a list of Movies.
 */
class MovieView extends React.Component {

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
        const genres = this.props.movie.getGenres()
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
                    <div className="movie-cell movie-title-wrapper-phone">
                        <div className="movie-cell movie-title">{this.props.movie.getTitle()}</div>
                    </div>
                    <div className="movie-cell movie-cover">
                        <img src={this.props.movie.getCoverUrl()}/>
                    </div>
                    <div className="movie-content">
                        <div className="movie-title-desc-wrapper">
                            <div className="movie-cell movie-title">{this.props.movie.getTitle()}</div>
                            <div className="movie-cell movie-description">{this.props.movie.getDescription()}</div>
                        </div>
                        <div className="movie-meta-info-wrapper">
                            <div className="movie-cell movie-format">{this.props.movie.getFormat()}</div>
                            <div className="movie-cell movie-length">{this.props.movie.getLength()} min</div>
                            <div className="movie-cell movie-publishdate">{this.props.movie.getReleaseDate()}</div>
                            <div className="movie-cell movie-genres">{genres}</div>
                        </div>
                        <div className="movie-cell movie-genres-mobile">{genres}</div>
                    </div>
                </div>
                <div className="movie-detail" style={this.state.styleDetails}>
                    <div className="movie-meta-info-wrapper-mobile">
                        <div className="movie-cell movie-format">{this.props.movie.getFormat()}</div>
                        <div className="movie-cell movie-length">{this.props.movie.getLength()} min</div>
                        <div className="movie-cell movie-publishdate">{this.props.movie.getReleaseDate()}</div>
                    </div>
                    <div>
                        {this.props.movie.getDescription()}
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

MovieView.propTypes = {
    movie: React.PropTypes.object.isRequired,
    onMovieClickListener: React.PropTypes.func
};

export default MovieView;