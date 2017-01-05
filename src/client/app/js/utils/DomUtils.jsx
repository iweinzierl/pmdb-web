"use strict";

module.exports = {

    arrayAddUnique: (array, ...args) => {
        args.forEach((arg) => {
            if (array.indexOf(arg) < 0) {
                array.push(arg);
            }
        });
    }
};
