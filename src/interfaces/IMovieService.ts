import { MovieDetails } from "../models/MovieDetails";

interface IMovieService {
    getMovies(): Promise<MovieDetails[]>;
    getMovieByName(name: string): Promise<MovieDetails>;
}

export default IMovieService;
