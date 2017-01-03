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
        movie.genres = this.genres || [];
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
            formatStat = 1;
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
            genreStat = 1;
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


/**
 * A collection of filters relating to movie properties.
 */
class MovieFilter {

    constructor(title, genres, formats) {
        if (title !== null && typeof title !== "string") {
            throw new TypeError("Expected string, got " + typeof title);
        }
        if (genres !== null && typeof genres !== GenresFilter) {
            throw new TypeError("Expected GenresFilter, got " + typeof genres);
        }
        if (formats !== null && typeof formats !== FormatsFilter) {
            throw new TypeError("Expected FormatsFilter, got " + typeof formats);
        }

        this.titleFilter = title;
        this.genresFilter = genres;
        this.formatsFilter = formats;
    }

    getTitleFilter() {
        return this.titleFilter;
    }

    getGenresFilter() {
        return this.genresFilter;
    }

    getFormatsFilter() {
        return this.formatsFilter;
    }

    matches(movie) {
        return this._matchesTitle(movie) && this._matchesGenres(movie) && this._matchesFormats(movie);
    }

    _matchesTitle(movie) {
        return this.titleFilter !== null
            ? movie.getTitle().toLowerCase().indexOf(this.titleFilter.toLowerCase()) >= 0
            : true;
    }

    _matchesGenres(movie) {
        return this.genresFilter !== null
            ? this.genresFilter.matches(movie)
            : true;
    }

    _matchesFormats(movie) {
        return this.formatsFilter !== null
            ? this.formatsFilter.matches(movie)
            : true;
    }

    filter(movies) {
        if (movies === null || movies === undefined) {
            return [];
        }

        if (!Array.isArray(movies)) {
            throw new TypeError("Expected array, got " + typeof movies);
        }

        return movies.filter(this.matches.bind(this));
    }

    static builder() {
        return new MovieFilterBuilder();
    }
}


class MovieFilterBuilder {
    constructor() {
        this.title = undefined;
        this.genres = undefined;
        this.formats = undefined;
    }

    withTitleFilter(title) {
        if (typeof title !== "string") {
            throw new TypeError("Expected string, got " + typeof title);
        }

        this.title = title;
        return this;
    }

    withGenresFilter(genresFilter) {
        if (genresFilter !== null && typeof genresFilter !== GenresFilter) {
            throw new TypeError("Expected GenresFilter, got " + typeof genresFilter);
        }

        this.genres = genresFilter;
        return this;
    }

    withFormatsFilter(formatsFilter) {
        if (formatsFilter !== null && typeof formatsFilter !== FormatsFilter) {
            throw new TypeError("Expected FormatsFilter, got " + typeof formatsFilter);
        }

        this.formats = formatsFilter;
        return this;
    }

    build() {
        return new MovieFilter(this.title, this.genres, this.formats);
    }
}


/**
 * A filter that specifies which genres are enabled or disabled.
 * Format is:
 * {
 *    enabled: [
 *      "Action",
 *      "Thriller"
 *    ],
 *    disabled: [
 *      "Comedy",
 *      "Documentation"
 *    ]
 * }
 */
class GenresFilter {

    constructor(enabled, disabled) {
        this.enabled = enabled;
        this.disabled = disabled;
    }

    getEnabled() {
        return this.enabled;
    }

    getDisabled() {
        return this.disabled;
    }

    matches(movie) {
        let matches = false;
        movie.getGenres().forEach((genre) => {
            this.enabled.forEach((fGenre) => {
                if (fGenre === genre) {
                    matches = true;
                }
            });
        }, this);

        return matches;
    }
}


/**
 * A filter that specifies which formats are enabled or disabled.
 * Format is:
 * {
 *    enabled: [
 *      "BLU-RAY",
 *      "DVD"
 *    ],
 *    disabled: [
 *      "GOOGLE_MOVIES",
 *      "AMAZON_VIDEO"
 *    ]
 * }
 */
class FormatsFilter {

    constructor(enabled, disabled) {
        this.enabled = enabled;
        this.disabled = disabled;
    }

    getEnabled() {
        return this.enabled;
    }

    getDisabled() {
        return this.disabled;
    }

    matches(movie) {
        let matches = false;
        this.enabled.forEach((format) => {
            if (movie.getFormat() === format) {
                matches = true;
            }
        });

        return matches;
    }
}


module.exports = {
    Movie: Movie,
    Stats: Stats,
    MovieFilter: MovieFilter,
    GenresFilter: GenresFilter,
    FormatsFilter: FormatsFilter
};