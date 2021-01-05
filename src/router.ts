// src\router.ts

import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.json("Welcome to 4on5 server");
});

export default router;
