"use strict";

require("../styles/app.less");

import React from "react";
import Search from "./search.jsx";
import User from "./user.jsx";
import {UsersResource} from "./http.jsx";

const Header = React.createClass({

    getInitialState: function () {
        return {
            user: {
                name: "",
                email: "",
                profileImage: ""
            }
        }
    },

    componentDidMount: function () {
        this.updateUser();
    },

    render: function () {
        return (
            <div className="header">
                <div className="header-menu">
                    <h1>PMDB</h1>
                </div>
                <div className="header-search">
                    <Search searchListener={this.props.searchListener}/>
                </div>
                <div className="header-user">
                    <User user={this.state.user}/>
                </div>
            </div>
        );
    },

    updateUser: function () {
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
    },
});

export default  Header;
