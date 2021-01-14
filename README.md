# Employee service API

The small GraphQL-API for fictional employee service.

## Technologies:

* Express.js
* Apollo GraphQL Server
* TypeORM


## Setup project:
1. Run `npm i` command
1. Run `cp .env.example .env`
1. Run `cp ormconfig.env.example ormconfig.env`
1. Setup database connection
1. Change the `*.env` files as you want

Optional: with Docker you can start the database  
with just one command: `docker-compose up -d`.

## Run for local development:
1. Run `npm run dev` command

Then you go to `http://localhost:4000/graphql`  
and work in a graphql playground.

Optional: you can run `ts-node src/seeder.ts` command for seeding database.

## Make and run production build
1. Run `npm run build` command
1. Run `npm run prod` command

## Demo credentials

* *Employee* role:  
phone: `+1(111)111-11-11`  
password: `secret`

* *HR* role:  
phone: `+2(222)222-22-22`  
password: `secret`

* *Director* role:  
phone: `+3(333)333-33-33`  
password: `secret`

## cURL request examples

Getting a token:
```
curl -H "Content-Type: application/json" \
  -X POST \
  -d '{"phone":"+1(111)111-11-11","password":"secret"}' \
  http://localhost:4000/token
```

Getting users (don't forget to past the *token*):
```
curl -H 'Content-Type: application/json' \
    -X POST \
    -H 'Authorization: Bearer PAST_TOKEN_HIRE' \
    --data-binary '{"query":" query {\n findUsers(first: 10) {\n lastName\n middleName\n firstName\n phone\n  }\n}"}' \
    http://localhost:4000/graphql

```
  
  


