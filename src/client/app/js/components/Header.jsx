"use strict";

import React from "react";
import {browserHistory} from "react-router";
import IconButton from "material-ui/IconButton";
import Menu from "material-ui/svg-icons/navigation/menu";
import {ActionCreators} from "../actions/filters.jsx";
import MovieStore from "../stores/MovieStore.jsx";
import UserStore from "../stores/UserStore.jsx";
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
        return (
            <div className="header">
                <div className="header-menu">
                    <IconButton onClick={this.props.onMenuClicked} iconStyle={menuIconStyle}
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
}

Header.propTypes = {
    onMenuClicked: React.PropTypes.func.isRequired
};

Header.contextTypes = {
    router: React.PropTypes.object
};

export default Header;