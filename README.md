# Northcoders News API
https://nc-news-ecke.onrender.com/

# Description #

API to provide access to and query PSQL tables.



# Requirements #


- npm
- express
- Nodemon
- psql
- node-postgres - min versions
- jest
- supertest
- Husky


# Instructions #

1) Clone repo from: https://github.com/bensuth86/be-nc-news
2) After cloning the repo, create following .env files to access development and test database:
     
     .env.development 
          - add PGDATABASE = nc_news
     .env.test 
          - add PGDATABASE = nc_news_test

3) install dependencies in order:
     $ npm init
     $ npm install
     $ npm install express --save 
     $ npm install --save-dev nodemon
     $ npm install pg
     $ npm install --save-dev jest
     $ npm install supertest --save-dev
     $ npm install husky --save-dev

4) Check package.json includes following scripts and dependencies:

     "scripts": {
          "setup-dbs": "psql -f ./db/setup.sql",
          "seed": "node ./db/seeds/run-seed.js",
          "test": "jest --verbose",
          "prepare": "husky install",
          "start": "node listen.js",
          "seed-prod": "NODE_ENV=production npm run seed"
     },

     "devDependencies": {
          "husky": "^8.0.2",
          "jest": "^27.5.1",
          "jest-extended": "^2.0.0",
          "jest-sorted": "^1.0.14",
          "pg-format": "^1.0.4",
          "supertest": "^6.3.4"
     },     

     "dependencies": {
          "dotenv": "^16.0.0",
          "express": "^4.18.2",
          "pg": "^8.7.3"
     },

     "jest": {
          "setupFilesAfterEnv": [
               "jest-extended/all", "jest-sorted"
          ]
     }

4) To seed local database require development-data files in app.test.js:


     - const { articleData, commentData, topicData, userData } = require('../db/data/test-data/index.js')
     
   Before the test descriptions include beforeEach() and afterAll() to reset the database after tests are run:

     - beforeEach(() => seed({ articleData, commentData, topicData, userData }))
     - afterAll(() => db.end())


5) Seed online database:
     
     npm- run seed.prod
     {
          "scripts": {
          "start": "node listen.js",
          "seed-prod": "NODE_ENV=production npm run seed"
          }
     }


6) Run all tests: 'npm test'

