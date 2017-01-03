"use strict";

require("../../styles/app.less");

import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../components/Header.jsx";
import UserStore from "../stores/UserStore.jsx";
import MovieStore from "../stores/MovieStore.jsx";
import {ActionCreators as MovieActionCreators} from "../actions/movies.jsx";
import {ActionCreators as UserActionCreators} from "../actions/users.jsx";
import {MoviesResource, UsersResource} from "../http.jsx";


class MainApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = UserStore.getState();
    }

    componentWillMount() {
        UserStore.subscribe(() => {
            if (this.state.accessToken !== UserStore.getState().accessToken) {
                this.updateMovies();
                this.updateCurrentUser();
            }

            this.setState(UserStore.getState());
        });

        if (!this.state.accessToken && !this.props.params.accessToken) {
            console.info("Access token not found in state nor in params -> redirect to login");
            this.context.router.push('/login');
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Header/>
                    <div className="body">
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

    updateMovies() {
        new MoviesResource(UserStore.getState().accessToken).get((movies) => {
            MovieStore.dispatch(MovieActionCreators.newRefreshedMoviesAction(movies));
        });
    }

    updateCurrentUser() {
        new UsersResource(UserStore.getState().accessToken).get((user) => {
            UserStore.dispatch(UserActionCreators.newRefreshedCurrentUserAction(user));
        });
    }
}

MainApp.contextTypes = {
    router: React.PropTypes.object
};

export default MainApp;