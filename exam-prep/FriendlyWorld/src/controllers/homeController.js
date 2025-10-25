import { Router } from "express";

const homeController = Router();

homeController.get("/", (req, res) => {
   console.log(req.user);
   res.render("home");
});

homeController.post("/", (req, res) => {
   console.log(req.body);
   res.send("it works!");
});

export default homeController;
