"use strict";

import React from "react";

class Label extends React.Component {

    render() {
        return (
            <div className="label">
                {this.props.message}
            </div>
        );
    }
}

Label.propTypes = {
    message: React.PropTypes.string.isRequired
};

export default Label;

