# Movie API Project

## Overview
This project is a movie API that fetches data from The Movie Database (TMDB), persists it in MongoDB, and provides CRUD endpoints for interacting with the persisted movie data. The API also includes a GraphQL endpoint for querying movie data.

## Features
- Fetches movie data from TMDB API
- Persists movie data in MongoDB
- Provides CRUD endpoints for movie data
- Includes GraphQL endpoint for querying movie data
- Fully documented with OpenAPI (Swagger) specification
- Comprehensive unit tests

## Requirements
- Node.js
- MongoDB
- TMDB API Key

## Getting Started

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/movie-api.git
    cd movie-api
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your TMDB API Key and MongoDB URI:
    ```env
    TMDB_API_KEY=your_tmdb_api_key
    MONGODB_URI=your_mongodb_uri
    ```

4. Run the application:
    ```sh
    npm run start
    ```

### Running Tests
To run the tests, use the following command:
```sh
npm run test
```

## API Endpoints

### REST Endpoints
- **POST /movies**: Save a new movie
- **GET /movies/:id**: Retrieve a movie by ID
- **GET /movies**: Retrieve all movies
- **PUT /movies/:id**: Update a movie by ID
- **DELETE /movies/:id**: Remove a movie by ID
- **POST /movies/fetch**: Fetch and save movie data from TMDB

### GraphQL Endpoint
- **GraphQL Playground**: [http://localhost:3000/graphql](http://localhost:3000/graphql)

### Swagger Documentation
- **Swagger UI**: [http://localhost:3000/api](http://localhost:3000/api)

## Using Docker
1. Ensure you have Docker and Docker Compose installed on your system.
2. Create a `.env` file in the root directory with the following content:
    ```env
    TMDB_API_KEY=your_tmdb_api_key
    MONGODB_URI=mongodb://mongodb:27017/netflix
    ```
3. Build and run the Docker containers:
    ```sh
    docker-compose up --build
    ```
4. The API will be available at [http://localhost:3000](http://localhost:3000)


## About TMDB

- It is free.
- An API Key is required to interact with it.
- One could check the documentation [here](https://developers.themoviedb.org/3/getting-started/introduction).


## Running Postman Tests with Newman
### Prerequisites
Ensure you have Newman installed. You can install Newman globally using npm:

```sh
npm install -g newman
```
### Running Tests

```sh
newman run postman/movie_api_tests.postman_collection.json
```
