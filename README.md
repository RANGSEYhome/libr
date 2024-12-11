# Express Server with Docker Compose

## Overview

This project is an Express server containerized with Docker Compose. It provides a simple library management system, including book showcase and user management.

## Features

- 5 resources with CRUD
- User authentication (login) and authorization
- API Docs (Swagger)
- Dockerfile and Docker Compose to package the project
- Redis for Caching
- API Security (Rate Limit, etc)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Docker
- Docker Compose

## Setup Instructions

### 1. Clone the Repository

Open your terminal and run the following command to clone the repository:

```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Setup Environment Variables

Create a `.env` file from the example provided in the repository:

```sh
cp .env.example .env
```

Make sure to edit the `.env` file to configure your environment variables as needed.

### 3. Build the Project

Build the Docker images defined in your `docker-compose.yml` file by running:

```sh
docker compose build
```

### 4. Run the Project

Start the application in detached mode (running in the background):

```sh
docker compose up -d
```

You can view the logs of the running application by executing:

```sh
docker compose logs
```

### 5. Generate fixture

To populate the database with initial data, you can generate fixtures. This can be done using a script provided in the project. Run the following command (change libr-express to your EXPRESS_CONTAINER value as you put in .env):

```sh
EXPRESS_CONTAINER=libr-express
FIXTURE_CONTAINER=$EXPRESS_CONTAINER-1
docker exec -i ${FIXTURE_CONTAINER} npm run generate
```

### 6. Access the API

The API will be available at the following URL (API_HOST):

```
http://localhost:4000
```

You can test the endpoints using tools like Postman or curl.

### 7. Stopping the Application

To stop the running containers, execute:

```sh
docker compose down
```

## API Documentation

For detailed API documentation, see API Documentation (API_HOST/docs).

```
http://localhost:4000/docs
```
