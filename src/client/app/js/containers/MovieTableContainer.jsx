"use strict";

import {connect} from 'react-redux'

import MovieTable from "../components/MovieTable.jsx";

const getVisibleMovies = (movies, filter) => {
    // TODO implement filtering
    return movies;
};

const mapStateToProps = (state) => {
    return {
        movies: getVisibleMovies(state.movies, state.filter)
    };
};

const MovieTableContainer = connect(
    mapStateToProps
)(MovieTable);

export default MovieTableContainer;

