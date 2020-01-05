const { ApolloServer } = require('apollo-server-express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');

const accessEnv = require('../helpers/accessEnv');
const resolvers = require('../graphql/resolvers').default;
const typeDefs = require('../graphql/typeDefs').default;
const graphQLErrorHandler = require('../server/graphqlErrors').default;

const PORT = accessEnv('PORT', 7000);

const apolloServer = new ApolloServer({
  formatError: graphQLErrorHandler,
  resolvers,
  typeDefs,
});

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API gateWay server listing on port ${PORT}`);
});
