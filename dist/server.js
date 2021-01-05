"use strict";
// src\server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const router_1 = __importDefault(require("./router"));
const server_1 = __importDefault(require("./apollo/server"));
const PORT = process.env.PORT || 5000;
const app = express_1.default();
app.use(cors_1.default());
// app.use(express.json());
app.use(router_1.default);
// create express server
const server = http_1.default.createServer(app);
// create apollo express server
server_1.default.attach(app);
// listen to the server calls
server.listen({ port: PORT }, () => {
    console.log(`Express server listening on port ${PORT}`);
    console.log(`Apollo server available at localhost:${PORT}${server_1.default.graphqlPath}`);
});
