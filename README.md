# Data Platform Project 21 Setup
```
Requirements:
This project uses NodeJS, MongoDB, Express, and Mongoose.

## Backend Node Application
```
.env setup
PORT=3000
STAGE=development
DB_HOST=cluster0.4v6ht5o.mongodb.net/test?authMechanism=SCRAM-SHA-1
DB_USER=project21
DB_PW=project21
ORGANIZATION=Project21

cd backend
npm install
node app.js
```
Follow instructions in backend README

## Frontend Vue 3 Application
```
.env setup
VITE_ROOT_API=http://localhost:3000

cd frontend
npm run dev
```
Follow instructions in frontend README

