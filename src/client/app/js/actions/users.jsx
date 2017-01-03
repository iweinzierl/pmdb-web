"use strict";

const USER_LOGGED_IN_TYPE = "USER_LOGGED_IN";
const REFRESHED_CURRENT_USER_TYPE = "REFRESHED_CURRENT_USER";

const newUserLoggedInAction = (accessToken) => {
    return {
        type: USER_LOGGED_IN_TYPE,
        accessToken: accessToken
    };
};

const newRefreshedCurrentUserAction = (user) => {
    return {
        type: REFRESHED_CURRENT_USER_TYPE,
        user: user
    };
};

module.exports = {
    ActionTypes: {
        USER_LOGGED_IN_TYPE: USER_LOGGED_IN_TYPE,
        REFRESHED_CURRENT_USER_TYPE: REFRESHED_CURRENT_USER_TYPE
    },
    ActionCreators: {
        newUserLoggedInAction: newUserLoggedInAction,
        newRefreshedCurrentUserAction: newRefreshedCurrentUserAction
    }
};
