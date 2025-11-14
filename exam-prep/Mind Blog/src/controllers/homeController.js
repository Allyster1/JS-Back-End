import { Router } from "express";
import { BlogService } from "../services/index.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
   const latestBlogs = await BlogService.getLatest();

   // console.log(req.user);
   res.render("home", { blogs: latestBlogs });
});

homeController.get("/profile", isAuth, async (req, res) => {
   const userId = req.user.id;

   const createdBlogs = await BlogService.getAllByOwner(userId);
   const followedBlogs = await BlogService.getAllByFollower(userId);

   const createdBlogsCount = createdBlogs.length;
   const followedBlogsCount = followedBlogs.length;

   res.render("profile", { createdBlogs, createdBlogsCount, followedBlogs, followedBlogsCount });
});

export default homeController;
