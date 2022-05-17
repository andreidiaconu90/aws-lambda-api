# About
* AWS Lambda + API Gateway using The Serverless Framework were used for the API part, and DynamoDb as a database.
* Inversify.js for IoC

# Setup
## Prerequisites
1) Install Docker `https://docs.docker.com/engine/install/`
2) Install serverless `npm intall serverless -g`

## First time run

Run the following commands:
1) `npm install`
2) `npm run docker-init`
3) `npm run start`

# Run tests
`npm run test`, the only test is failing on assertion but there's a console.log in the live code showing that the mocking works. Search for `TEST: {` in the Terminal after you've run the tests.

The application should start on `http://localhost:3000`

## URLs:

│ GET | http://localhost:3000/dev/movies     │

│ GET | http://localhost:3000/dev/movies/Avengers: Infinity War │


## DynamoDb
DynamoDb schema,data, and CF template were generated using NoSQL Workbench, see `/static` folder for a visualisation of the MoviesTable and Indexes(The logical order is MovieTable.png > m2mIndex.png > NameIndex.png), also make sure to download or scroll to the left to see the full image.
