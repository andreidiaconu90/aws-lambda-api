import { APIGatewayEvent } from "aws-lambda";
import "source-map-support/register";
import DemoContainer from "../containers/MoviesContainer";
import SERVICE_IDENTIFIERS from "../containers/ServiceIdentifiers";
import IMovieService from "../interfaces/IMovieService";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
exports.handler = async (event: APIGatewayEvent) => {
    const movieService = DemoContainer.get<IMovieService>(SERVICE_IDENTIFIERS.IMovieService);
    const movieResponse = await movieService.getMovies();
    if (movieResponse) {
        return {
            body: JSON.stringify(movieResponse),
            statusCode: 200,
        };
    }
    return {
        body: "No movies found",
        statusCode: 404,
    };
};
