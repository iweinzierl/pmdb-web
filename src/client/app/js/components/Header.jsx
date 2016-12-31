"use strict";

import React from "react";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import List from "material-ui/svg-icons/action/list";
import MovieCreation from "material-ui/svg-icons/image/movie-creation";
import Menu from "material-ui/svg-icons/navigation/menu";
import {ActionCreators} from "../actions/filters.jsx";
import MovieStore from "../stores/MovieStore.jsx";
import UserStore from "../stores/UserStore.jsx";
import DrawerHeader from "./DrawerHeader.jsx";
import Search from "./Search.jsx";


const menuButtonStyle = {
    "padding": 0
};

const menuIconStyle = {
    "color": "#fff",
    "width": "36px",
    "height": "36px"
};

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drawerOpen: false,
            user: UserStore.getState().user
        };

        UserStore.subscribe(() => {
            this.setState({
                user: UserStore.getState().user
            });
        });
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
                    <Search searchListener={Header.searchChanged}/>
                </div>
            </div>
        );
    }

    static searchChanged(search) {
        MovieStore.dispatch(ActionCreators.newUpdateTitleFilterAction(search));
    }

    openList() {
        window.location = "/#/list";
    }

    openMovieForm() {
        window.location = "/#/create";
    }

    toggleDrawer() {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }
}

export default Header;