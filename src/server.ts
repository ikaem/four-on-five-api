// src\server.ts

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import http from "http";

import router from "./router";
import apolloServer from "./apollo/server";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
// app.use(express.json());
app.use(router);

// create express server
const server = http.createServer(app);

// create apollo express server
apolloServer.attach(app);

// listen to the server calls
server.listen({ port: PORT }, () => {
  console.log(`Express server listening on port ${PORT}`);
  console.log(
    `Apollo server available at localhost:${PORT}${apolloServer.graphqlPath}`
  );
});
