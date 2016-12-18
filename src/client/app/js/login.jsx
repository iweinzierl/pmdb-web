"use strict";

import React from "react";
import {render} from "react-dom";
import LoginButton from "./login_button.jsx";

const LoginView = React.createClass({

    render: function() {
        return (
            <LoginButton />
        );
    }

});

render(<LoginView/>, document.getElementById('app'));
