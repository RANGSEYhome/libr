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

---

# MY PERSONAL NOTE

## To bootstrap a simple Express.js project, follow these steps:

- Create a new directory for your project.Initialize a new Node.js project using npm init command.
- Install Express.js using npm install express command.
- Create necessary directories such as src for source code, public for static files, etc.
- Create a main file (e.g., index.js) inside the src directory to define your Express.js application.

## Dependencies

- Install nodemon: npm install --save-dev nodemon (add "dev": "nodemon index.js", to scripts in package.json => can npm run dev)
- Install body-parser: npm install body-parser
- Install express-async-handler: npm install express-async-handler
- Install env: npm install dotenv
- Install faker: npm install @faker-js/faker --save-dev
- Install mongoose: npm install mongoose
- Install jsonwebtoken: npm install jsonwebtoken
- Install bcrypt: npm install bcrypt
- Install passport: npm install passport
- Install passport-jwt: npm install passport-jwt
- Install express-validator: npm install express-validator
- Install axios: npm install axios
- Install redis: npm install redis
- Install express-intercept: npm install express-intercept
- Install multer: npm install multer
- Install multer-s3: npm install multer-s3 @aws-sdk/client-s3
- Install uuid: npm install uuid
- Install express-rate-limit: npm install express-rate-limit
- Install rate-limit-redis: npm install rate-limit-redis
- Install socket.io: npm install express socket.io
- Install redis-adapter: npm install @socket.io/redis-adapter
- Install ioredis: npm install ioredis
- Install core: npm install cores
- Install mongoose-paginate-v2: npm install mongoose-paginate-v2
- Install swagger-generator-express: npm install --save swagger-generator-express
- Install joi: npm install joi

## Setting up MongoDB via Docker

- Install Docker on your machine if you haven't already. Docker Installation Guide
- Pull the MongoDB Docker image:
- docker pull mongo
- Run MongoDB as a Docker container:
- docker run --name my-mongodb -d -p 27017:27017 mongo

## Docker logout/login

- docker login

```
docker login
```

- Login my docker account

```
docker login -u rangseyheng
```

- Logout

```
docker logout
```

## Docke compose build

```
docker-compose up --build
```

## Start/Stop Container

- Start

```
docker-compose up -d
```

- Stop

```
docker-compose down
```
