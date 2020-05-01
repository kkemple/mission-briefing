const { ApolloServer, gql } = require("apollo-server-lambda");
const arc = require("@architect/functions");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const handler = server.createHandler();

exports.handler = function (event, context, callback) {
  let body = arc.http.helpers.bodyParser(event);
  // Body is now parsed, re-encode to JSON for Apollo
  event.body = JSON.stringify(body);
  handler(event, context, callback);
};
