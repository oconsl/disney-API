
# Disney API

An API to manage Disney characters, movies and genres.

Avaible methods:

- **characters**: `GET` | `GET by ID` | `POST` | `PUT by ID` | `DELETE by ID`
- **movies**: `GET` | `GET by ID` | `POST` | `PUT by ID` | `DELETE by ID`
- **genres**: `GET` | `POST` | `PUT by ID` | `DELETE by ID`
- **user**: `LOGIN` | `REGISTER`
## Documentation

To see the API documentation, click on the following link: [Postman](https://documenter.getpostman.com/view/18628145/UyxjFm6x)
## Run Locally

Clone the project

```bash
  git clone https://github.com/oconsl/disney-API.git
```

Install dependencies

```bash
  npm i
```

Create the database with psql:

```bash
  psql -U postgres

  CREATE DATABASE disney;
```

Create and configure .env file on root folder with the following environment variables:

`USER`=**postgres**  (default)

`HOST`=**localhost**

`DB`=**Database name**  (disney)

`PASSWORD`=**User DB password**

`PORT`=**5432**  (default)

`SERVER_PORT`=**3000**  (default)

`JWT_SECRET`=**Secret to encode JWT**

`SENDGRID_API_KEY`=**API Key provided by sendGrind**

`OWNER_EMAIL`=**Sender Email for sendGrid**


Start the server

```bash
  npm start
```


## Running Tests

Before running the tests, add the following environment variable to .env file, it must be a valid token provided by /auth/login endpoint:

`TEST_TOKEN`=Bearer **token**

After that to run tests, run the following command after creating the database successfully:

```bash
  npm test
```


## Tech Stack

`Node` `Express` `SendGrid` `PostgreSQL` `Sequelize` `JWT` `JOI` `Express-jwt` `Mocha` `Chai` `Bcrypt`


## Author

- Ocón, Santiago Luis - [@oconsl](https://github.com/oconsl) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ocon-santiago)

