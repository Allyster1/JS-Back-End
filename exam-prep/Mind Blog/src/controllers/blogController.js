import { Router } from "express";
import { BlogService } from "../services/index.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const blogController = Router();

blogController.get("/", isAuth, async (req, res) => {
   const blogs = await BlogService.getAll();

   res.render("blogs", { blogs });
});

blogController.get("/create", isAuth, (req, res) => {
   res.render("blogs/create");
});

blogController.post("/create", isAuth, async (req, res) => {
   const blogData = req.body;
   const userId = req.user.id;

   try {
      await BlogService.create(blogData, userId);

      res.redirect("/blogs");
   } catch (err) {
      res.render("blogs/create", {
         error: getErrorMessage(err),
         blog: blogData,
      });
   }
});

blogController.get("/:blogId/details", async (req, res) => {
   const blogId = req.params.blogId;
   const userId = req.user?.id;

   const blog = await BlogService.getOne(blogId);
   const isOwner = blog.owner.equals(userId);

   const followers = blog.followList.map((follower) => follower.email).join(", ");
   const isFollowing = blog.followList.some((follower) => follower.equals(userId));

   res.render("blogs/details", { blog, isOwner, followers, isFollowing });
});

blogController.get("/:blogId/follow", isAuth, async (req, res) => {
   const blogId = req.params.blogId;
   const userId = req.user.id;

   await BlogService.follow(blogId, userId);

   res.redirect(`/blogs/${blogId}/details`);
});

blogController.get("/:blogId/delete", isAuth, async (req, res) => {
   const blogId = req.params.blogId;
   const userId = req.user.id;

   await BlogService.remove(blogId, userId);

   res.redirect("/blogs");
});

blogController.get("/:blogId/edit", isAuth, async (req, res) => {
   const blogId = req.params.blogId;
   const userId = req.user.id;

   const blog = await BlogService.getOne(blogId);

   if (!blog.owner.equals(userId)) {
      throw {
         statusCode: 401,
         message: "Cannot edit blog that you're not the owner of",
      };
   }

   res.render("blogs/edit", { blog });
});

blogController.post("/:blogId/edit", isAuth, async (req, res) => {
   const blogData = req.body;
   const blogId = req.params.blogId;
   const userId = req.user.id;

   const blog = await BlogService.getOne(blogId);

   if (!blog.owner.equals(userId)) {
      throw {
         statusCode: 401,
         message: "Cannot edit blog that you're not the owner of",
      };
   }

   try {
      const blog = await BlogService.getOne(blogId);

      if (!blog.owner.equals(userId)) {
         return res.redirect(`/blogs/${blogId}/details`);
      }

      await BlogService.edit(blogId, blogData);

      res.redirect(`/blogs/${blogId}/details`);
   } catch (err) {
      res.render("blogs/edit", {
         blog: blogData,
         error: getErrorMessage(err),
      });
   }
});

export default blogController;
