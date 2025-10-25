import { Router } from "express";

const errorController = Router();

errorController.all("/*path", (req, res) => {
   res.status(404).render("404");
});

export default errorController;
