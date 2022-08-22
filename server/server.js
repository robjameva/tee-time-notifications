const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
// const { checkTimes } = require('./utils/checkTimes');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
    // create a new Appolo server and pass in our schema
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        // context: authMiddleware,
        cors: {
            origin: ["https://tee-time-alerts.herokuapp.com/", "https://studio.apollographql.com"]
        },
    });

    // Start the server
    await server.start();

    // integrate our Apollo server with the Express application as middleware
    server.applyMiddleware({ app });

    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
}

startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});