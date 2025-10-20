import { Schema, model } from "mongoose";

const UserSchema = new Schema({
   email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true, // This is database index
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please fill a valid email address"],
   },
   age: {
      type: Number,
      required: true,
      min: [18, "Age should be at least 18"],
      max: [120, "Age cannot be larger than 120"],
      validate: {
         validator: function (value) {
            if (this.type === "teacher") return value >= 22;

            return true;
         },
         message: "Teacher age should be at least 22",
      },
   },
   type: {
      type: String,
      required: true,
      enum: {
         values: ["Student", "Teacher"],
         message: "Invalid user type",
      },
   },
   password: {
      type: String,
      required: true,
      minLength: [8, "Password should be at least 8 characters long!"],
      maxLength: [100, "Password is too long!"],
   },
});

const User = model("User", UserSchema);

export default User;
