import { ApolloServer } from '@apollo/server'; // preserve-line
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import express from "express";
import cors from "cors";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from "http";
import dotenv from "dotenv";
import connectDB from './db/connectDb.js';

dotenv.config();
const app = express()
const httpServer = http.createServer(app)
const port = 4000;

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start()

app.use("/",
    express.json(),
    cors(),
    expressMiddleware(server, {
        context: async ({ req }) => ({ req }),
    }),
)

await new Promise((resolve) =>
    httpServer.listen({ port }, resolve),
);
await connectDB() // now connect to server

console.log(`🚀 Server ready at http://localhost:4000/`);