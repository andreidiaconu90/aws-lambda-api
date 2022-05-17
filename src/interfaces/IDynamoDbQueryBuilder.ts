import { DocumentClient } from "aws-sdk/clients/dynamodb";

interface IDynamoDbQueryBuilder {
    buildPkEqualsQuery(PK: string): DocumentClient.QueryInput;
    buildSkBeginsWithQuery(PK: string, SK: string): DocumentClient.QueryInput;
    buildNameIndexQuery(name: string): DocumentClient.QueryInput;
}

export default IDynamoDbQueryBuilder;
