# Crewfare Rooming List Management App - API #

Nest.js backend application designed to event management. The Rooming List API is a NestJS-based application designed to manage rooming lists and associated bookings. A rooming list is a collection of bookings sent to a hotel for confirmation. Each rooming list has specific attributes and contains multiple bookings, ensuring accurate processing of guest accommodations.

## Live ##

Explore the deployed project:

- **Live Demo (Frontend)** - [https://crewfare-rooming-list-panel.vercel.app/](https://crewfare-rooming-list-panel.vercel.app/)

- **Backend Docs** - [https://crewfare-rooming-list-api.onrender.com/api](https://crewfare-rooming-list-api.onrender.com/api)

## Installation Steps ##

To get the project up and running:

1. Clone the repo:

  ```shell
  git clone https://github.com/lucasd09/crewfare-rooming-list-api.git
  cd crewfare-rooming-list-api
  ```

2. Install dependencies using **[pnpm](https://pnpm.io/installation)**:

  ```shell
  pnpm install
  ```

3. If you want to run locally, follow this steps to set up a database and connect it to the API:

  a. Run the compose.yaml file, it will set up a basic postgres database

  ```shell
  sudo docker compose up -d
  ```

  b. create a .env file and paste the following line on it: 
  ```
  DATABASE_URL="postgres://root:root@localhost:5432/db"

  ```

4. Start the application:

  ```shell
  pnpm dev
  ```

## Design System and Documentation ##

**OpenAPI** is fully integrated, providing a very rich documentation and examples of all endpoints.

You can access through:

```
http://localhost:3000/api
```

or check the live version on [https://crewfare-rooming-list-api.onrender.com/api](https://crewfare-rooming-list-api.onrender.com/api)

## Project Screenshots ##

### Swagger ###

![Swagger](./public/swagger.png)

### Tests ###

![Tests](./public/tests.png)

## Features ##

Here're some of the project's best features:

- Granular commits following the **[Conventional Commits Specs](https://www.conventionalcommits.org/en/v1.0.0/)**
- Unit tests using @nest/testing library.
- RESTful API endpoints adhering to REST standards for clean and predictable API design.

## Built with ##

Technologies used in the project:

- Nest.js
- Typescript
- Jest
