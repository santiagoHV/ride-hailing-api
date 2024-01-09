
# Ride Hailing API 🚗💳

The Ride-Hailing API is a platform developed with NestJS. Designed to manage driver requests and facilitate journeys, this API integrates the power of Wompi as a payment platform for a secure and efficient payment experience.

## Installation

1. Clone repository

```bash
  git clone
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
