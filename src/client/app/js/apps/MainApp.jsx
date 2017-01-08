"use strict";

require("../../styles/app.less");

import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import List from "material-ui/svg-icons/action/list";
import DrawerHeader from "../components/DrawerHeader.jsx";
import MovieCreation from "material-ui/svg-icons/image/movie-creation";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../components/Header.jsx";
import UserStore from "../stores/UserStore.jsx";
import MovieStore from "../stores/MovieStore.jsx";
import {ActionCreators as MovieActionCreators} from "../actions/movies.jsx";
import {ActionCreators as UserActionCreators} from "../actions/users.jsx";
import {MoviesResource, UsersResource} from "../http.jsx";
import {Stats} from "../domain.jsx";
import StatsView from "../components/StatsView.jsx";


class MainApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = UserStore.getState();
        this.state.drawerOpen = false;
    }

    componentWillMount() {
        UserStore.subscribe(() => {
            if (this.state.accessToken !== UserStore.getState().accessToken) {
                this.updateMovies();
                this.updateCurrentUser();
            }

            this.setState(UserStore.getState());
        });

        MovieStore.subscribe(() => {
            this.setState({
                stats: Stats.builder()
                    .withMovies(MovieStore.getState().collection.movies)
                    .withGenres(MovieStore.getState().collection.genres)
                    .withFormats(MovieStore.getState().collection.formats)
                    .build()
            });
        });

        if (!this.state.accessToken && !this.props.params.accessToken) {
            console.info("Access token not found in state nor in params -> redirect to login");
            this.context.router.push('/login');
        }
    }

    render() {
        let stats = null;
        if (this.state.stats) {
            stats = <StatsView stats={this.state.stats}/>
        }

        return (
            <MuiThemeProvider>
                <div>
                    <Header stats={this.state.stats} onMenuClicked={this.toggleDrawer.bind(this)}/>
                    <Drawer open={this.state.drawerOpen} className="drawer">
                        <DrawerHeader clickedHeader={this.toggleDrawer.bind(this)} user={this.state.user}/>
                        <MenuItem leftIcon={<List/>} onTouchTap={this.openList.bind(this)}>List</MenuItem>
                        <MenuItem leftIcon={<MovieCreation/>} onTouchTap={this.openMovieForm.bind(this)}>Add</MenuItem>
                        {stats}
                    </Drawer>
                    <div className="body">
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

    toggleDrawer() {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    openList() {
        this.context.router.push('/list');
        this.toggleDrawer();
    }

    openMovieForm() {
        this.context.router.push('/create');
        this.toggleDrawer();
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