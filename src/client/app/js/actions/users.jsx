"use strict";

const USER_LOGGED_IN_TYPE = "USER_LOGGED_IN";

const newUserLoggedInAction = (user) => {
    return {
        type: USER_LOGGED_IN_TYPE,
        user: user
    };
};

module.exports = {
    ActionTypes: {
        USER_LOGGED_IN_TYPE: USER_LOGGED_IN_TYPE
    },
    ActionCreators: {
        newUserLoggedInAction: newUserLoggedInAction
    }
};
