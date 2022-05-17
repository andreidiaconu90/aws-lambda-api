import { DocumentClient } from "aws-sdk/clients/dynamodb";

interface IDynamoDbRepository {
    queryItems(query: DocumentClient.QueryInput): Promise<DocumentClient.QueryOutput>;
}

export default IDynamoDbRepository;
