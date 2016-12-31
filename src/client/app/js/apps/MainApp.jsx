"use strict";

require("../../styles/app.less");

import injectTapEventPlugin from "react-tap-event-plugin";
import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../components/Header.jsx";

// Needed for onTouchTap, see http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


class MainApp extends React.Component {

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Header/>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default MainApp;