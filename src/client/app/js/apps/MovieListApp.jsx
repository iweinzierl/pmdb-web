"use strict";

require("../../styles/app.less");
require("../../styles/movielist.less");

import React from "react";
import MovieTable from "../components/MovieTable.jsx";
import {MovieFilterView} from "../components/MovieFilterView.jsx";
import MovieStore from "../stores/MovieStore.jsx";
import UserStore from "../stores/UserStore.jsx";
import {ActionCreators} from "../actions/filters.jsx";


class MovieListApp extends React.Component {

    constructor(props) {
        super(props);

        this.unsubscribeMovieStore = null;
        this.state = {
            movies: MovieStore.getState().collection.movies,
            filter: MovieStore.getState().filter
        };
    }

    componentWillMount() {
        if (!UserStore.getState().accessToken) {
            console.info("Access token not found in state -> redirect to login");
            this.context.router.push('/login');
        }

        this.unsubscribeMovieStore = MovieStore.subscribe(() => {
            this.setState({
                movies: MovieStore.getState().collection.movies,
                filter: MovieStore.getState().filter
            });
        });
    }

    componentWillUnmount() {
        if (this.unsubscribeMovieStore !== null) {
            this.unsubscribeMovieStore();
        }
    }

    render() {
        const collection = this.state.filter
            ? this.state.filter.filter.filter(this.state.movies)
            : this.state.movies;

        return (
            <div className="movielistapp-container">
                <div className="movielistapp-list">
                    <MovieTable key="collection" movies={collection}/>
                </div>
                <div className="movielistapp-filter">
                    <MovieFilterView onGenreFilterChanged={MovieListApp.onGenreFilterChanged}
                                     onFormatFilterChanged={MovieListApp.onFormatFilterChanged}/>
                </div>
            </div>
        );
    }

    static onGenreFilterChanged(evt) {
        MovieStore.dispatch(ActionCreators.newUpdateGenresFilterAction(evt.enabled, evt.disabled));
    }

    static onFormatFilterChanged(evt) {
        MovieStore.dispatch(ActionCreators.newUpdateFormatsFilterAction(evt.enabled, evt.disabled));
    }
}

MovieListApp.contextTypes = {
    router: React.PropTypes.object
};

export default MovieListApp;