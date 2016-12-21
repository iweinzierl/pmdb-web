"use strict";

require("../styles/app.less");

import React from "react";
import {GenresResource} from "./http.jsx";

const Menu = React.createClass({

    render: function () {
        return (
            <div className="menu">
                <div className="menu-sub">
                    <MenuItem icon="/public/ic_list_black_36dp_1x.png" title="List" route="/index.html"
                              applicationState={this.props.applicationState}/>
                    <MenuItem icon="/public/ic_create_black_36dp_1x.png" title="Create" route="/add.html"
                              applicationState={this.props.applicationState}/>
                </div>
            </div>
        );
    }
});

const MenuItem = React.createClass({

    render: function () {
        return (
            <div className="menu-item" onClick={this.select}>
                <img src={this.props.icon}/>
                <span>{this.props.title}</span>
            </div>
        );
    },

    select: function () {
        window.location = this.props.route + "#access_token=" + this.props.applicationState.accessToken;
    }
});


export default Menu;
