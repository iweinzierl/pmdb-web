"use strict";

import React from "react";
import Search from "./search.jsx";
import User from "./user.jsx";

const Header = React.createClass({

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
                    <User user={this.props.user}/>
                </div>
            </div>
        );
    }
});

export default  Header;
