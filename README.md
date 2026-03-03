<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Client Gateway
This is a client gateway for the NestJS application. It serves as an entry point for clients to connect and interact with our services. It is responsible for handling incoming requests, managing client connections, and facilitating communication between clients and the server.

## Dev
1. Clone the repository
2. Install dependencies with `npm install`
3. Create an `.env` file based on the `.env.example` file and fill in the required environment variables
4. Have all the microservices running (auth, user, notification, etc.)
5. Up the client gateway with `npm run start:dev`

## Nats
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```