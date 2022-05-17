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

The application should start on `http://localhost:3000`

## URLs:

│ GET | http://localhost:3000/dev/movies     │
│ GET | http://localhost:3000/dev/movies/{s} │      


## DynamoDb
DynamoDb schema,data, and CF template were generated using NoSQL Workbench, see `/static` folder for a visualisation of the MoviesTable and Indexes
