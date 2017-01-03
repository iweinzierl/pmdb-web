"use strict";

require("../../styles/app.less");

import React from "react";
import MovieTable from "../components/MovieTable.jsx";
import MovieStore from "../stores/MovieStore.jsx";
import UserStore from "../stores/UserStore.jsx";


class MovieListApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = MovieStore.getState();
        this.unsubscribeMovieStore = null;
    }

    componentWillMount() {
        this.unsubscribeMovieStore = MovieStore.subscribe(() => {
            this.setState(MovieStore.getState());
        });

        if (!UserStore.getState().accessToken) {
            console.info("Access token not found in state -> redirect to login");
            this.context.router.push('/login');
        }
    }

    componentWillUnmount() {
        if (this.unsubscribeMovieStore !== null) {
            this.unsubscribeMovieStore();
        }
    }

    render() {
        return (
            <div>
                <MovieTable movies={this.state.movies}/>
            </div>
        );
    }
}

MovieListApp.contextTypes = {
    router: React.PropTypes.object
};

export default MovieListApp;