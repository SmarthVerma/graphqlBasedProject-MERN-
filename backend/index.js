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
// new for me
import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongodb-session'

import { buildContext } from "graphql-passport";
import { configurePassport } from './passport/passport.config.js';

configurePassport()
dotenv.config();
const app = express() 
const httpServer = http.createServer(app)
const port = 4000;

const MongoDbStore = connectMongo(session)
const store = new MongoDbStore({
    uri: process.env.MONGODB_URI,
    collection: "session",
})

store.on('error', (err) => console.log('Error on mongoDbStore', err))

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

app.use(session({
    secret: process.env.SESSION_SECERT,
    resave: false, // specifies wheather to save the session ti the store on every request
    saveUninitialized: false, // specifies whether to save unintialized sessions
    cookie: {
        maxAge: 1000 * 60 * 60* 24 * 7, // 1 week
        httpOnly: true // prevents Cross-Site scripting attacks
    },
    store: store
}))
app.use(passport.initialize());
app.use(passport.session());

await server.start()

app.use("/",
    express.json(),
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
    expressMiddleware(server, {
        context: async ({ req, res }) => buildContext({ req, res }), // context basically saving grahQuery on 3 argument
    }),
)

await new Promise((resolve) =>
    httpServer.listen({ port }, resolve),
);
await connectDB() // now connect to server

console.log(`🚀 Server ready at http://localhost:4000/`);