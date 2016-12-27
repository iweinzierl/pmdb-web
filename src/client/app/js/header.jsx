"use strict";

require("../styles/app.less");

import React from "react";

import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import List from 'material-ui/svg-icons/action/list';
import MovieCreation from 'material-ui/svg-icons/image/movie-creation';
import Menu from 'material-ui/svg-icons/navigation/menu';

import Search from "./search.jsx";
import User from "./user.jsx";
import {UsersResource} from "./http.jsx";

const menuButtonStyle = {
    "padding": 0
};

const menuIconStyle = {
    "color": "#fff",
    "width": "36px",
    "height": "36px"
};


class DrawerHeader extends React.Component {

    render() {
        return (
            <div className="drawer-header" onClick={this.props.clickedHeader}>
                <div className="drawer-header-title">PMDB</div>
                <User user={this.props.user}/>
            </div>
        );
    }
}

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

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            user: {
                name: "",
                email: "",
                profileImage: ""
            }
        };
    }

    componentDidMount() {
        this.updateUser();
    }

    render() {
        let stats = null;
        if (this.props.stats !== undefined && this.props.stats !== null) {
            stats = <StatsView stats={this.props.stats}/>
        }

        return (
            <div className="header">
                <Drawer open={this.state.drawerOpen} className="drawer">
                    <DrawerHeader clickedHeader={this.toggleDrawer.bind(this)} user={this.state.user}/>
                    <MenuItem leftIcon={<List/>} onTouchTap={this.openList.bind(this)}>List</MenuItem>
                    <MenuItem leftIcon={<MovieCreation/>} onTouchTap={this.openMovieForm.bind(this)}>Add</MenuItem>
                    {stats}
                </Drawer>

                <div className="header-menu">
                    <IconButton onClick={this.toggleDrawer.bind(this)} iconStyle={menuIconStyle}
                                style={menuButtonStyle}>
                        <Menu/>
                    </IconButton>
                    <span>PMDB</span>
                </div>
                <div className="header-search">
                    <Search searchListener={this.props.searchListener}/>
                </div>
            </div>
        );
    }

    openList() {
        window.location = "index.html" + "#access_token=" + this.props.applicationState.accessToken;
    }

    openMovieForm() {

        window.location = "/add.html" + "#access_token=" + this.props.applicationState.accessToken;
    }

    toggleDrawer() {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    updateUser() {
        const self = this;
        new UsersResource(this.props.applicationState.accessToken).get(
            function (data) {
                self.setState({
                    user: data
                });
            },
            function (error) {
                console.log("Unable to fetch users: " + error);
            }
        );
    }
}

DrawerHeader.propTypes = {
    clickedHeader: React.PropTypes.func
};

StatsView.propTypes = {
    stats: React.PropTypes.object.isRequired
};

Header.propTypes = {
    applicationState: React.PropTypes.object.isRequired,
    searchListener: React.PropTypes.func,
    stats: React.PropTypes.object
};

export default  Header;
