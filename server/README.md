<h1 align="center">
    <img alt="Icons made by Freepik" src="https://image.flaticon.com/icons/svg/1122/1122550.svg" height="124" width="124">
    <br>
    Meetapp API
</h1>

The backend for Meetapp application is developed using NodeJS and Express.

It connects to Postgres (storage), Redis (mail queue control) and MongoDB (log notifications). Each service runs in a separated container and they all comunicate through a network (meetapp_network) created with docker-compose, that is being used to orchestrate the containers creation.

Jest is used for tests using Sqlite3 instead of Postgres, so we can run all tests from a clean database every round.

This application has the following functionalities:

- User creation / updates
- User authentication with JWT
- Authentication middleware for session control
- Password cryptograpy

## :rocket: Installation

> I'm suposing you have Docker and Docker-Compose installed on your machine. If not, you can follow the tutorial here: [Docker Instalation](https://docs.docker.com/install/).
> Note that this project is a monorepo that contains backend, frontend and mobile, so when you clone this application you will get the three projects.

Clone the repository (case you haven't done it yet):

```bash
git clone https://github.com/giovanniantonaccio/meetapp.git
```

Rename `.env.example` to `.env` and fill the empty fields. Since we will create a container with Postgres image from Docker Hub, we can use the values in this file to determine the username, the password and a database name when docker creates it.

- DB_USER will be the postgres user
- DB_PASS will be the postgres password for user
- DB_NAME will be the name of the database created.

Build the container image

```bash
cd meetapp/server
docker-compose build
```

Now you only need to run the application (docker-compose will create all containers for you like magic! :tada:)

```bash
docker-compose up -d
```

## :books: Technologies

This project was developed with the following technologies:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [nodemon](https://nodemon.io/)
- [Sucrase](https://github.com/alangpierce/sucrase)
- [Docker](https://www.docker.com/docker-community)
- [Sequelize](http://docs.sequelizejs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [node-postgres](https://www.npmjs.com/package/pg)
- [Redis](https://redis.io/)
- [JWT](https://jwt.io/)
- [Multer](https://github.com/expressjs/multer)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Youch](https://www.npmjs.com/package/youch)
- [Yup](https://www.npmjs.com/package/yup)
- [Bee Queue](https://www.npmjs.com/package/bcrypt)
- [Nodemailer](https://nodemailer.com/about/)
- [date-fns](https://date-fns.org/)
- [Sentry](https://sentry.io/)
- [DotEnv](https://www.npmjs.com/package/dotenv)
- [VS Code](https://code.visualstudio.com/) with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## :memo: License

This project is under the MIT license. See the [LICENSE](https://github.com/giovanniantonaccio/meetapp/blob/master/LICENSE) for more information.

---

Made by Giovanni Antonaccio :wave: [Get in touch!](https://www.linkedin.com/in/giovanniantonaccio/)
