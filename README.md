# Nest js project template hexagonal

Here is a project template written on Nest js and 
based on a hexagonal architecture approach.
## Getting Started

It's supposed that **node**, **npm**, **docker** and **docker-compose** are installed on your machine.

PostgresSQL is used as primary database, so be sure that this one is installed. You can use docker-compose file for this purpose:

```
docker-compose up
```

After that create *.env.local* file and specify relevant variables for connection. See example in *.env.example* file.

### Installing

1. To install all dependencies:

```
npm install
```

2. To build the project:

```
npm run build
```

3. To run the project localy:

```
npm run start:local
```

## Running the tests

Before running tests create *.env.test* file and specify relevant variables for connection to database.

1. To run all tests:

```
npm run test
```

2. To run unit tests:

```
npm run test:unit
```

3. To run acceptance tests:

```
npm run test:acceptance
```

4. To run integration tests:

```
npm run test:integration
```

## Basic technology stack

* [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications

* [TypeORM](https://docs.nestjs.com/recipes/sql-typeorm) - Amazing ORM for TypeScript and JavaScript


* [Sentry](https://github.com/getsentry/sentry-javascript/tree/master/packages/node) - Application Monitoring and Error Tracking Software

* [Swagger](https://docs.nestjs.com/recipes/swagger) - Open api

* [Grafana](https://grafana.com/) - Open source analytics & monitoring solution for every database 

## CI/CD & Deployment

See Travis.ci pipeline example in *.travis.yml.example*
