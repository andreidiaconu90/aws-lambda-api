import "reflect-metadata";
import { Container } from "inversify";
import SERVICE_IDENTIFIERS from "./ServiceIdentifiers";
import IMovieService from "../interfaces/IMovieService";
import MovieService from "../services/MovieService";
import IDynamoDbRepository from "../interfaces/IDynamoDbRepository";
import DynamoDbRepository from "../services/DynamoDbRepository";
import IDynamoDbQueryBuilder from "../interfaces/IDynamoDbQueryBuilder";
import DynamoDbQueryBuilder from "../services/DynamoDbQueryBuilder";

const MoviesContainer = new Container();

MoviesContainer.bind<IMovieService>(SERVICE_IDENTIFIERS.IMovieService).to(MovieService).inSingletonScope();
MoviesContainer.bind<IDynamoDbQueryBuilder>(SERVICE_IDENTIFIERS.IDynamoDbQueryBuilder).to(DynamoDbQueryBuilder).inSingletonScope();
MoviesContainer.bind<IDynamoDbRepository>(SERVICE_IDENTIFIERS.IDynamoDbRepository).to(DynamoDbRepository).inSingletonScope();

export default MoviesContainer;
