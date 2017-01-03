"use strict";

require("../../styles/app.less");

import React from "react";
import MovieStore from "../stores/MovieStore.jsx";
import UserStore from "../stores/UserStore.jsx";


class MovieCreateApp extends React.Component {

    constructor(props) {
        super(props);
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

    render() {
        return (
            <div>
                <h1>Create new movie</h1>
            </div>
        );
    }
}

export default MovieCreateApp;
