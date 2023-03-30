# Movielix
#### Web application that helps you to store an info about films and manage them

## Technologies
- Node.js
- Express.js
- Sequelize
- SQLite
- JWT
- Docker

## How to launch
1. run `npm i` to install existing dependencies
2. create `.env` file with necessary *APP_PORT* & *JWT_SECRET* fields in root directory
3. run `npm start`:  to start local server & make app alive :)

## How to Docker
1. create `.env` file with necessary *APP_PORT* & *JWT_SECRET* fields in root directory
2. `docker build -t your_account/movielix .`
3. `docker run --name movielix -p 8000:8050 -e APP_PORT=8050 your_account/movielix`
