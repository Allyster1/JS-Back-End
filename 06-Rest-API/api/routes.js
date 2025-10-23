import { Router } from "express";
import postController from "./controllers/postController.js";
import userController from "./controllers/userController.js";

const routes = Router();

routes.use("/posts", postController);
routes.use("/users", userController);

export default routes;
