import { injectable } from "inversify";
import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import IDynamoDbRepository from "../interfaces/IDynamoDbRepository";

@injectable()
class DynamoDbRepository implements IDynamoDbRepository {
    private dynamoDbClient;
    constructor() {
        this.dynamoDbClient = new DynamoDB.DocumentClient({
            endpoint: "http://localhost:8000",
            accessKeyId: "1111",
            secretAccessKey: "22222",
        });
    }

    public async queryItems(query: DocumentClient.QueryInput): Promise<DocumentClient.QueryOutput> {
        return await this.dynamoDbClient.query(query).promise();
    }
}

export default DynamoDbRepository;
