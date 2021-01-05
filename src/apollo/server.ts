// src\apollo\server.ts

import { ApolloServer, gql } from "apollo-server-express";
import { Application } from "express";
import { GraphQLDateTime } from "graphql-iso-date";

import { matches } from "../fake-data/fake-data";

const typeDefs = gql`
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
    getMyMatches: async (parent: any, args: { myId: string }, context: any) => {
      return matches;
    },
  },
  DateTime: GraphQLDateTime,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default {
  attach: (app: Application) => {
    server.applyMiddleware({ app, path: "/graphql" });
  },
  graphqlPath: server.graphqlPath,
  log: () => console.log(server),
};
