
# Ride Hailing API 🚗💳

The Ride-Hailing API is a platform developed with NestJS. Designed to manage driver requests and facilitate journeys, this API integrates the power of Wompi as a payment platform for a secure and efficient payment experience.


## Implemented features

- Authentication: Login and Signup endpoints with token return
- Rides:
    
    - Request a ride by a Rider user
    - Finish a ride by a Driver user
    - Pay ride by a Rider user (Payment handled with wompi API)
    - Get all rides
- Payment sources:
    - Get my payment sources (linked with Wompi API payment sources)
- Payments:
    - Get my pending Payments

## Technologies used

- Node.js
- NestJS
- Docker
- TypeORM
- Passport
- JsonWebToken
- Axios
- Postgres
- Jest




## Installation

1. Clone repository

```bash
  git clone https://github.com/santiagoHV/ride-hailing-api
```

2. Install dependencies

```bash
  npm install
```

3. Create database using docker

```bash
  docker-compose up -d
```

4. Create **.env.development** and **.env.test** files and copy env variables availables in **.env.template** file.

5. Run migrations

```bash
  npm run migrate:up
  npm run migrate:test
```
6. Create database seeds
```bash
  npm run seeds
```
It is important to keep in mind that the currently saved seeds have a payment source linked to a data saved in the wompi sandbox created for the development of this project.


## Run Locally

Start the server

```bash
  npm run start:dev
```

And service will be available in localhost:3000

## Deployment

Currently the app is deployed in a EC2 instance without a pipeline, for deployment communicate with santiherreravelas@gmail.com


## Authors

- [@santiagoHV](https://www.github.com/santiagoHV)