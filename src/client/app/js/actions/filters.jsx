"use strict";

const FILTER_TITLE_UPDATE_TYPE = "UPDATE_TITLE_FILTER";
const FILTER_GENRES_UPDATE_TYPE = "UPDATE_GENRES_FILTER";
const FILTER_FORMATS_UPDATE_TYPE = "UPDATE_FORMATS_FILTER";

const newUpdateTitleFilterAction = (title) => {
    return {
        type: FILTER_TITLE_UPDATE_TYPE,
        title: title
    };
};

const newUpdateGenresFilterAction = (enabledGenres, disabledGenres) => {
    return {
        type: FILTER_GENRES_UPDATE_TYPE,
        enabled: enabledGenres,
        disabled: disabledGenres
    };
};

const newUpdateFormatsFilterAction = (enabledFormats, disabledFormats) => {
    return {
        type: FILTER_FORMATS_UPDATE_TYPE,
        enabled: enabledFormats,
        disabled: disabledFormats
    };
};

module.exports = {
    ActionTypes: {
        FILTER_TITLE_UPDATE_TYPE: FILTER_TITLE_UPDATE_TYPE,
        FILTER_GENRES_UPDATE_TYPE: FILTER_GENRES_UPDATE_TYPE,
        FILTER_FORMATS_UPDATE_TYPE: FILTER_FORMATS_UPDATE_TYPE
    },
    ActionCreators: {
        newUpdateTitleFilterAction: newUpdateTitleFilterAction,
        newUpdateGenresFilterAction: newUpdateGenresFilterAction,
        newUpdateFormatsFilterAction: newUpdateFormatsFilterAction
    }
};
