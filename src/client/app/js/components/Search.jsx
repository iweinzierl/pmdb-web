"use strict";

import React from "react";

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ""
        };
    }

    render() {
        return (
            <div className="search">
                <div className="search-icon">
                    <img src="//www.gstatic.com/images/icons/material/system/1x/search_white_24dp.png"/>
                </div>
                <input type="text" placeholder="Search" value={this.state.value} onChange={this.valueChanged.bind(this)}/>
            </div>
        );
    }

    valueChanged(evt) {
        this.setState({
            value: evt.target.value
        }, function () {
            this.props.searchListener(this.state.value);
        });
    }
}

Search.propTypes = {
    searchListener: React.PropTypes.func.isRequired
};

export default Search;
