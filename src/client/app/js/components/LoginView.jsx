"use strict";

import React from "react";

class LoginView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loginview-container">
                <div className="loginview-header">
                    Sign In With
                </div>
                <div className="loginview-options">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default LoginView;