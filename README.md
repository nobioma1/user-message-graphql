# User-Message GraphQL

GraphQL server with Sequelize + Postgres and Node.js

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

For development, you will only need Node.js postgres database installed on your environment.

    $ node --version
    v10.16.0

    $ psql

### Installing

First, Create postgres db `user-message`

    $ https://github.com/nobioma1/user-message-graphql.git
    $ cd user-message-graphql
    $ yarn install
    $ yarn db:migrate
    $ yarn db:seed

### Starting Development Server

    $ yarn dev:server

Open `http://localhost:5000/graphql` [GraphQL PlayGround](http://localhost:5000/graphql) to view it in the browser.

**Example GraphQL query:**

```
query {
  messages {
    id
    text
  }
}
```

**Example response:**

```json
{
  "data": {
    "messages": [
      {
        "id": "1",
        "text": "Alo, How are you?"
      },
      {
        "id": "2",
        "text": "Hi, I'm learning GraphQL"
      }
    ]
  }
}
```

**Example GraphQL mutation:**

```
mutation{
  createMessage(text: "This message was added now") {
    id
    text
    user {
      id
      username
    }
  }
}
```

## Used technologies

- GraphQL
- Apollo-Server
- Postgres with Sequelize
- Node
