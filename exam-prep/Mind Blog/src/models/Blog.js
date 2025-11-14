import { Schema, model, Types } from "mongoose";
import User from "./User.js";

const blogSchema = new Schema(
   {
      title: {
         type: String,
         minLength: [5, "Title should be at least 5 characters"],
         maxLength: [50, "Title should cannot be longer than 50 characters"],
         required: [true, "Title is required!"],
      },
      imageUrl: {
         type: String,
         required: [true, "Image URL is required!"],
         validate: {
            validator: function (value) {
               return /^https?:\/\//i.test(value);
            },
            message: "Image URL must start with http:// or https://",
         },
      },
      content: {
         type: String,
         minLength: [10, "Content should be at least 10 characters"],
         required: [true, "Content is required!"],
      },
      category: {
         type: String,
         minLength: [3, "Category should be at least 3 characters"],
         required: [true, "Category is required!"],
      },
      owner: {
         type: Types.ObjectId,
         ref: User,
      },
      followList: [
         {
            type: Types.ObjectId,
            ref: User,
         },
      ],
   },
   {
      timestamps: true,
   }
);

const Blog = model("Blog", blogSchema);

export default Blog;
