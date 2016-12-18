"use strict";

import React from "react";

const Search = React.createClass({

    getInitialState: function () {
        return {
            value: ""
        }
    },

    render: function () {
        return (
            <div className="search">
                <div className="search-icon">
                    <img src="//www.gstatic.com/images/icons/material/system/1x/search_white_24dp.png"/>
                </div>
                <input type="text" placeholder="Search" value={this.state.value} onChange={this.valueChanged}/>
            </div>
        );
    },

    valueChanged: function (evt) {
        this.setState({
            value: evt.target.value
        }, function () {
            this.props.searchListener(this.state.value);
        });
    }
});

export default Search;
