"use strict";

import React from "react";

class User extends React.Component {

    render() {
        let imageSource = "";
        let username = "";

        if (this.props.user !== undefined) {
            imageSource = this.props.user.profileImage;
            username = this.props.user.name;
        }

        return (
            <div className="user">
                <img title={username} src={imageSource}/>
                <span>{username}</span>
            </div>
        );
    }
}

User.propTypes = {
    user: React.PropTypes.object.isRequired
};

export default User;
