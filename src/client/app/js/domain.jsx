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

class Stats {

    constructor() {
        this.numberOfMovies = 0;
        this.formats = {};
        this.genres = {};
    }

    getNumberOfMovies() {
        return this.numberOfMovies;
    }

    getNumberOfFormats() {
        return Object.keys(this.formats).length;
    }

    getNumberOfGenres() {
        return Object.keys(this.genres).length;
    }

    static builder() {
        return new StatsBuilder();
    }
}

class StatsBuilder {

    constructor() {
        this.numberOfMovies = 0;
        this.formats = {};
        this.genres = {};
    }

    withMovies(movies) {
        this.numberOfMovies = movies.length;
        return this;
    }

    withFormats(formats) {
        if (formats !== undefined && formats !== null) {
            formats.forEach(this.withFormat, this);
        }
        return this;
    }

    withFormat(format) {
        let formatStat = this.formats[format];

        if (formatStat === undefined || formatStat === null) {
            formatStat  = 1;
        }
        else {
            formatStat = formatStat + 1;
        }

        this.formats[format] = formatStat;

        return this;
    }

    withGenres(genres) {
        if (genres !== undefined && genres !== null) {
            genres.forEach(this.withGenre, this);
        }
        return this;
    }

    withGenre(genre) {
        let genreStat = this.genres[genre];

        if (genreStat === undefined || genreStat === null) {
            genreStat  = 1;
        }
        else {
            genreStat = genreStat + 1;
        }

        this.genres[genre] = genreStat;

        return this;
    }

    build() {
        const stats = new Stats();
        stats.numberOfMovies = this.numberOfMovies;
        stats.formats = this.formats || {};
        stats.genres = this.genres || {};
        return stats;
    }
}


module.exports = {
    Movie: Movie,
    Stats: Stats
};