"use strict";

class Movie {

    constructor() {
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getCoverUrl() {
        return this.coverUrl;
    }

    getDescription() {
        return this.description;
    }

    getReleaseDate() {
        return this.releaseDate;
    }

    getLength() {
        return this.length;
    }

    getFormat() {
        return this.format;
    }

    getGenres() {
        return this.genres;
    }

    static builder() {
        return new MovieBuilder();
    }
}

class MovieBuilder {

    withId(id) {
        this.id = id;
        return this;
    }

    withTitle(title) {
        this.title = title;
        return this;
    }

    withCoverUrl(coverUrl) {
        this.coverUrl = coverUrl;
        return this;
    }

    withDescription(description) {
        this.description = description;
        return this;
    }

    withReleaseDate(releaseDate) {
        this.releaseDate = releaseDate;
        return this;
    }

    withLength(length) {
        this.length = length;
        return this;
    }

    withFormat(format) {
        this.format = format;
        return this;
    }

    withGenres(genres) {
        this.genres = genres;
        return this;
    }

    build() {
        const movie = new Movie();
        movie.id = this.id;
        movie.title = this.title;
        movie.coverUrl = this.coverUrl;
        movie.description = this.description;
        movie.releaseDate = this.releaseDate;
        movie.length = this.length;
        movie.format = this.format;
        movie.genres = this.genres;
        return movie;
    }
}


module.exports = {
    Movie: Movie
};