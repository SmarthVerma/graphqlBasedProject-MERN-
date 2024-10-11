import { ApolloServer } from '@apollo/server'; // preserve-line
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import express from "express";
import cors from "cors";
import { expressMiddleware } from '@apollo/server/express4';


const app = express()
const port = 4002;

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
});

app.use(express.json());
app.use(cors());

await server.start()

app.use("/graphql", expressMiddleware(server))

app.listen(port, () => {
    console.log('Server is running on port ', port)
})

