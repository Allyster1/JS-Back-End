import { Schema, Types, model } from "mongoose";

const postSchema = new Schema(
   {
      title: {
         type: String,
         minLength: [10, "Title is too short!"],
      },
      content: {
         type: String,
         minLength: [20, "Content is too short!"],
      },
      author: {
         type: Types.ObjectId,
         ref: "User",
      },
   },
   { timestamps: true }
);

const Post = model("POST", postSchema);

export default Post;
