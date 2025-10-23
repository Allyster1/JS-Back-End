import { Router } from "express";
import Post from "../models/Post.js";

import { getErrorMessage } from "../utils/errorUtils.js";

const postController = Router();

postController.get("/", async (req, res) => {
   const posts = await Post.find().populate("author");

   res.json(posts);
});

postController.post("/", async (req, res) => {
   const postData = req.body;
   const userId = req.user.id;

   try {
      const createdPost = await Post.create({
         ...postData,
         author: userId,
      });

      res.status(201).json(createdPost);
   } catch (err) {
      res.status(400).json({ message: getErrorMessage(err) });
   }
});

postController.get("/:postsId", async (req, res) => {
   const postId = req.params.postsId;

   const post = await Post.findById(postId).populate("author");

   if (!post) {
      return res.status(404).end();
   }

   res.json(post);
});

postController.put("/:postId", async (req, res) => {
   const postId = req.params.postsId;
   const postData = req.body;

   try {
      const updatedPost = await Post.findByIdAndUpdate(postId, postData, { runValidators: true });

      res.status(200).json(updatedPost);
   } catch (err) {
      res.status(400).json({ message: getErrorMessage(err) });
   }
});

postController.delete("/:postId", async (req, res) => {
   const postId = req.params.postsId;

   await Post.findOneAndDelete(postId);

   res.status(204).end();
});

export default postController;
