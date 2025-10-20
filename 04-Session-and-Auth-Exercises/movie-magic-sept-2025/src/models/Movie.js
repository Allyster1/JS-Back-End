import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
   title: {
      type: String,
      minLength: [5, "Title is too short"],
      match: [/^[a-zA-Z0-9 ]+$/, "Title has some invalid characters"],
      required: [true, "Movie title is required!"],
   },
   category: {
      type: String,
      enum: {
         values: ["tv-show", "animation", "movie", "documentary", "short-film"],
         message: "Your category is invalid!",
      },
      required: [true, "Movie category is required!"],
   },
   genre: {
      type: String,
      minLength: [5, "Movie genre is too short"],
      match: [/^[a-zA-Z0-9 ]+$/, "Genre has some invalid characters"],
      required: [true, "Movie genre is required!"],
   },
   director: {
      type: String,
      minLength: [5, "Movie director is too short"],
      match: [/^[a-zA-Z0-9 ]+$/, "Director has some invalid characters"],
      required: [true, "Movie director is required!"],
   },
   year: {
      type: Number,
      min: [1900, "Movie cannot be less than 1900"],
      max: [2024, "Movie cannot be greater than 2024"],
      required: [true, "Movie year is required!"],
   },
   imageUrl: {
      type: String,
      match: [/^https?:\/\//, "ImageUrl is invalid"],
      required: [true, "Movie imageUrl is required!"],
   },
   rating: {
      type: Number,
      min: [1, "Rating cannot be less than 1"],
      max: [10, "Rating cannot be higher than 10"],
      required: [true, "Movie rating is required!"],
   },
   description: {
      type: String,
      minLength: [20, "Description should be at least 20 characters"],
      match: [/^[a-zA-Z0-9 ]+$/, "Description has some invalid characters"],
      required: [true, "Movie description is required!"],
   },
   casts: [
      {
         type: Types.ObjectId,
         ref: "Cast",
      },
   ],
   creator: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Movie should have a creator!"],
   },
});

const Movie = model("Movie", movieSchema);

export default Movie;
