import { Schema, model, Types } from "mongoose";
import User from "./User.js";

const mythSchema = new Schema(
   {
      name: {
         type: String,
         minLength: [2, "The Name should be at least 2 characters"],
         required: [true, "Name is required!"],
      },
      origin: {
         type: String,
         minLength: [3, "The Origin should be at least 3 characters"],
         required: [true, "Origin is required!"],
      },
      role: {
         type: String,
         minLength: [2, "The Role should be at least 2 characters"],
         required: [true, "Role is required!"],
      },
      imageUrl: {
         type: String,
         validate: {
            validator: function (value) {
               return /^https?:\/\//i.test(value);
            },
            message: "The Myth Image should start with http:// or https://",
         },
         required: [true, "imageUrl is required!"],
      },
      symbol: {
         type: String,
         minLength: [3, "The Symbol should be between 3 and 40 characters"],
         maxLength: [40, "The Symbol should be between 3 and 40 characters"],
         required: [true, "Symbol is required!"],
      },
      era: {
         type: String,
         minLength: [5, "The Era should be between 5 and 15 characters"],
         maxLength: [15, "The Era should be between 5 and 15 characters"],
         required: [true, "Era is required!"],
      },
      description: {
         type: String,
         minLength: [10, "The Description should be a minimum of 10 characters long"],
         required: [true, "Description is required!"],
      },
      likedList: [
         {
            type: Types.ObjectId,
            ref: User,
         },
      ],
      owner: {
         type: Types.ObjectId,
         ref: User,
      },
   },
   { timestamps: true }
);

const Myth = model("Myth", mythSchema);

export default Myth;
