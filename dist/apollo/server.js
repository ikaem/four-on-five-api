"use strict";
// src\apollo\server.ts
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const graphql_iso_date_1 = require("graphql-iso-date");
const fake_data_1 = require("../fake-data/fake-data");
const typeDefs = apollo_server_express_1.gql `
    scalar DateTime

  type Query {
    hello: String
    getMyMatches(myId: String!): [Match]
  }
  type Match {
    id: String
    title: String
    timeStart: DateTime
    timeEnd: DateTime
    location: Location
    confirmedPlayers: Int
    maxPlayers: Int
    organizer: MatchOrganizer
  }

  type Location {
    lat: Float
    lon: Float
  }

  type MatchOrganizer {
    userId: String
    username: String
    teamId: String
    teamName: String
  }
`;
const resolvers = {
    Query: {
        hello: async () => "Hello world!",
        getMyMatches: async (parent, args, context) => {
            return fake_data_1.matches;
        },
    },
    DateTime: graphql_iso_date_1.GraphQLDateTime,
};
const server = new apollo_server_express_1.ApolloServer({
    typeDefs,
    resolvers,
});
exports.default = {
    attach: (app) => {
        server.applyMiddleware({ app, path: "/graphql" });
    },
    graphqlPath: server.graphqlPath,
    log: () => console.log(server),
};
