import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { injectable } from "inversify";
import IDynamoDbQueryBuilder from "../interfaces/IDynamoDbQueryBuilder";

@injectable()
class DynamoDbQueryBuilder implements IDynamoDbQueryBuilder {
    public buildPkEqualsQuery(PK: string): DocumentClient.QueryInput {
        return {
            TableName: "MoviesTable",
            KeyConditionExpression: "#PK = :pk",
            ExpressionAttributeValues: {
                ":pk": `${PK}`,
            },
            ExpressionAttributeNames: {
                "#PK": "PK",
            },
        };
    }

    public buildSkBeginsWithQuery(PK: string, SK: string): DocumentClient.QueryInput {
        return {
            TableName: "MoviesTable",
            KeyConditionExpression: "#PK = :pk and begins_with(#SK, :sk)",
            ExpressionAttributeValues: {
                ":pk": `${PK}`,
                ":sk": `${SK}`,
            },
            ExpressionAttributeNames: {
                "#PK": "PK",
                "#SK": "SK",
            },
        };
    }

    public buildNameIndexQuery(name: string): DocumentClient.QueryInput {
        return {
            TableName: "MoviesTable",
            IndexName: "NameIndex",
            KeyConditionExpression: "#NameIndexpk = :pk",
            ExpressionAttributeValues: {
                ":pk": `${name}`,
            },
            ExpressionAttributeNames: {
                "#NameIndexpk": "Name",
            },
        };
    }
}

export default DynamoDbQueryBuilder;
