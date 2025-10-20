import { Schema, Types, model } from "mongoose";

const castSchema = new Schema({
   name: {
      type: String,
      minLength: [5, "Cast name is too short"],
      match: [/^[a-zA-Z0-9 ]+$/, "name has some invalid characters"],
      required: [true, "Cast name is required!"],
   },
   age: {
      type: Number,
      max: [120, "Age cannot be more than 120"],
      min: [1, "Age cannot be less than 1"],
      required: [true, "Cast age is requried!"],
   },
   born: {
      type: String,
      minLength: [10, "Born should be at least 10 characters"],
      match: [/^[a-zA-Z0-9 ]+$/, "Name has some invalid characters"],
      required: [true, "Borb is required"],
   },
   imageUrl: {
      type: String,
      match: [/^https?:\/\//, "ImageUrl is invalid"],
      required: [true, "Cast imageUrl is required!"],
   },
});

const Cast = model("Cast", castSchema);

export default Cast;
