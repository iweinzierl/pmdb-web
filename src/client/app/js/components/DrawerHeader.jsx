"use strict";

import React from "react";
import User from "./User.jsx";

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

DrawerHeader.propTypes = {
    clickedHeader: React.PropTypes.func,
    user: React.PropTypes.object.isRequired
};

export default DrawerHeader;
