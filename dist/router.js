"use strict";
// src\router.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get("/", async (req, res) => {
    res.json("Welcome to 4on5 server");
});
exports.default = router;
