import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { SinonStubbedInstance, stub, restore } from "sinon";
import IDynamoDbRepository from "../interfaces/IDynamoDbRepository";
import DynamoDbRepository from "../services/DynamoDbRepository";
import DynamoDbQueryBuilder from "../services/DynamoDbQueryBuilder";
import IDynamoDbQueryBuilder from "../interfaces/IDynamoDbQueryBuilder";
import MovieService from "../services/MovieService";

describe("unit test for MovieService", () => {
    let dynamoDbRepository: SinonStubbedInstance<IDynamoDbRepository>;
    let dynamoDbQueryBuilder: SinonStubbedInstance<IDynamoDbQueryBuilder>;
    let moviesService: MovieService;

    beforeEach(() => {
        dynamoDbRepository = stub(DynamoDbRepository.prototype);
        dynamoDbQueryBuilder = stub(DynamoDbQueryBuilder.prototype);
        moviesService = new MovieService(dynamoDbRepository, dynamoDbQueryBuilder);
    });

    afterEach(() => {
        restore();
    });

    it("getMovies request returns expected response", async () => {
        
        const mockDynamoDbResponse = { Items: [{ PK: "AND#", SK: "AND#123", Year: "2022", Name: "Andrei Diaconu" }], Count: 1 };
        dynamoDbRepository.queryItems.resolves(mockDynamoDbResponse);
        
        const response = moviesService.getMovies();
        
        expect(response).to.equal({
            Title: "Andrei Diaconu",
            Year: "2022",
            PK: "AND#",
            SK: "AND#123"
        })
    });
});
