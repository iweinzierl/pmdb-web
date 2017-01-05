"use strict";

import React from "react";

class GoogleLoginView extends React.Component {

    render() {
        return (
            <div className="googleloginview-button" onClick={this.props.onClick}/>
        );
    }
}

GoogleLoginView.propTypes = {
    onClick: React.PropTypes.func.isRequired
};

export default GoogleLoginView;