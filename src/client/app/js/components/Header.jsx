"use strict";

import React from "react";
import {browserHistory} from "react-router";
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
import StatsView from "./StatsView.jsx";


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

        this.unmountUserStore = UserStore.subscribe(() => {
            this.setState({
                user: UserStore.getState().user
            });
        });
    }

    componentWillUnmount() {
        if (this.unmountUserStore) {
            this.unmountUserStore();
        }
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
        this.context.router.push('/list');
        this.toggleDrawer();
    }

    openMovieForm() {
        this.context.router.push('/create');
        this.toggleDrawer();
    }

    toggleDrawer() {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }
}

Header.propTypes = {
    stats: React.PropTypes.object
};

Header.contextTypes = {
    router: React.PropTypes.object
};

export default Header;