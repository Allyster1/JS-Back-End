import { Router } from "express";
import { userService } from "../services/index.js";

const userController = Router();

userController.get("/register", (req, res) => {
   res.render("users/register");
});

userController.post("/register", async (req, res) => {
   const { email, password } = req.body;

   const result = await userService.register(email, password);

   res.redirect("/users/login");
});

export default userController;
