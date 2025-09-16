import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to user page");
});

router.get("/list", (req, res) => {
  res.send("User List Page");
});

export default router;
