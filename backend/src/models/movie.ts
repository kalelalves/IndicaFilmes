class Movie {
    id: string;
    title: string;
    description: string;
    releaseYear: number;
    director: string;
    actors: string[];
    rating: number;

    constructor(
        id: string,
        title: string,
        description: string,
        releaseYear: number,
        director: string,
        actors: string[],
        rating: number
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.releaseYear = releaseYear;
        this.director = director;
        this.actors = actors;
        this.rating = rating;
    }
}
export default Movie;
export {};