import { injectable, inject } from "inversify";
import { DynamoDB } from "aws-sdk";
import { MovieDetails } from "../models/MovieDetails";
import { ActorDetails } from "../models/ActorDetails";
import { DirectorDetails } from "../models/DirectorDetails";
import { MoviesRawResponse } from "../models/MoviesRawResponse";
import { CastRawResponse } from "../models/CastRawResponse";
import SERVICE_IDENTIFIERS from "../containers/ServiceIdentifiers";
import IMovieService from "../interfaces/IMovieService";
import IDynamoDbRepository from "../interfaces/IDynamoDbRepository";
import IDynamoDbQueryBuilder from "../interfaces/IDynamoDbQueryBuilder";

@injectable()
class MovieService implements IMovieService {
    private dynamoDbRepository: IDynamoDbRepository;
    private queryBuilder: IDynamoDbQueryBuilder;

    constructor(
        @inject(SERVICE_IDENTIFIERS.IDynamoDbRepository) dynamoDbRepository: IDynamoDbRepository,
        @inject(SERVICE_IDENTIFIERS.IDynamoDbQueryBuilder) dynamoDbQueryBuilder: IDynamoDbQueryBuilder
    ) {
        this.dynamoDbRepository = dynamoDbRepository;
        this.queryBuilder = dynamoDbQueryBuilder;
    }

    public async getMovies(): Promise<MovieDetails[]> {
        const moviesResponse = await this.dynamoDbRepository.queryItems(this.queryBuilder.buildSkBeginsWithQuery("MOV#", "MOV#"));
        if (moviesResponse.Count === 0) {
            return [];
        }

        const response: MovieDetails[] = [];
        const movieDetailsRawResponse = moviesResponse.Items as MoviesRawResponse[];

        for (const item of movieDetailsRawResponse) {
            const movieCast = await this.getMovieCast(item.SK);
            response.push({
                Title: item.Name,
                Year: item.Year,
                Cast: movieCast.Cast,
                DirectedBy: movieCast.DirectedBy,
            });
        }
        return response;
    }

    public async getMovieByName(name: string): Promise<MovieDetails> {
        const getMovieByNameResponse = await this.dynamoDbRepository.queryItems(this.queryBuilder.buildNameIndexQuery(name));
        if (getMovieByNameResponse.Count === 0) {
            return null;
        }
        const movieDetailsRawResponse = getMovieByNameResponse.Items[0] as MoviesRawResponse;

        const castDetails = await this.getMovieCast(movieDetailsRawResponse.SK);
        castDetails.Title = movieDetailsRawResponse.Name;
        castDetails.Year = movieDetailsRawResponse.Year;

        return castDetails;
    }

    private async getMovieCast(PK: string): Promise<MovieDetails> {
        const getMovieCastByIdResponse = await this.dynamoDbRepository.queryItems(this.queryBuilder.buildPkEqualsQuery(PK));
        const movieCastRawResponse = getMovieCastByIdResponse.Items as CastRawResponse[];

        const movieCast: MovieDetails = {
            Title: "",
            Year: "",
            Cast: [],
            DirectedBy: [],
        };

        movieCastRawResponse.map((item) => {
            if (item.SK.startsWith("ACT#")) {
                movieCast.Cast.push({
                    Name: item.Name,
                    CharacterName: item.CharacterName,
                    Id: item.PK,
                    SortKey: item.SK,
                } as ActorDetails);
            }
            if (item.SK.startsWith("DIR#")) {
                movieCast.DirectedBy.push({
                    Name: item.Name,
                    Id: item.PK,
                    SortKey: item.SK,
                } as DirectorDetails);
            }
        });

        return movieCast;
    }

    // private buildPkEqualsQuery(PK: string): DocumentClient.QueryInput {
    //     return {
    //         TableName: "MoviesTable",
    //         KeyConditionExpression: "#PK = :pk",
    //         ExpressionAttributeValues: {
    //             ":pk": `${PK}`,
    //         },
    //         ExpressionAttributeNames: {
    //             "#PK": "PK",
    //         },
    //     };
    // }

    // private buildSkBeginsWithQuery(PK: string, SK: string): DocumentClient.QueryInput {
    //     return {
    //         TableName: "MoviesTable",
    //         KeyConditionExpression: "#PK = :pk and begins_with(#SK, :sk)",
    //         ExpressionAttributeValues: {
    //             ":pk": `${PK}`,
    //             ":sk": `${SK}`,
    //         },
    //         ExpressionAttributeNames: {
    //             "#PK": "PK",
    //             "#SK": "SK",
    //         },
    //     };
    // }

    // private buildNameIndexQuery(name: string): DocumentClient.QueryInput {
    //     return {
    //         TableName: "MoviesTable",
    //         IndexName: "NameIndex",
    //         KeyConditionExpression: "#NameIndexpk = :pk",
    //         ExpressionAttributeValues: {
    //             ":pk": `${name}`,
    //         },
    //         ExpressionAttributeNames: {
    //             "#NameIndexpk": "Name",
    //         },
    //     };
    // }
}
export default MovieService;
