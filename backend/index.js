import { ApolloServer } from '@apollo/server';
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import express from "express";
import cors from "cors";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from "http";
import dotenv from "dotenv";
import connectDB from './db/connectDb.js';
import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongodb-session';
import { buildContext } from "graphql-passport";
import { configurePassport } from './passport/passport.config.js';

// Configuration
configurePassport();
dotenv.config();
const app = express();
const httpServer = http.createServer(app);
const port = 4000;

const MongoDbStore = connectMongo(session);
const store = new MongoDbStore({
    uri: process.env.MONGODB_URI,
    collection: "session",
});

store.on('error', (err) => console.log('Error on mongoDbStore', err));

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

// Middleware
app.use(cors({
    origin: "http://localhost:5174", // Removed trailing slash
    credentials: true,
}));
app.use(express.json()); // Make sure JSON body parsing is applied globally
app.use(session({
    secret: process.env.SESSION_SECERT,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly: true
    },
    store: store
}));
app.use(passport.initialize());
app.use(passport.session());

// Start Apollo Server
await server.start();

app.use("/graphql",
    expressMiddleware(server, {
        context: async ({ req, res }) => buildContext({ req, res }),
    }),
);

await new Promise((resolve) =>
    httpServer.listen({ port }, resolve),
);
console.log('CheckBefore');
await connectDB(); // Connect to database

console.log(`🚀 Server ready at http://localhost:4000/`);