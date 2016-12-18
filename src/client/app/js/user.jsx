"use strict";

import React from "react";

const User = React.createClass({

    render: function () {
        let imageSource = "";
        let username = "";
        if (this.props.user !== undefined) {
            imageSource = this.props.user.profileImage;
            username = this.props.user.name;
        }

        return (
            <img title={username} src={imageSource} />
        );
    }
});

export default User;
