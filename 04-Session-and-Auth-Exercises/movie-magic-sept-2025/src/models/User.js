import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
   email: {
      type: String,
      match: [/[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/],
      unique: [true, "Email should be unique!"],
      minLength: [10, "Email should be at least 10 characters"],
      required: [true, "Email is required!"],
   },
   password: {
      type: String,
      match: [/^[a-zA-Z0-9 ]+$/, "Password has some invalid characters"],
      minLength: [6, "Password should be at least 6 characters"], //TODO: Add more password validations
      required: [true, "Password is required!"],
   },
});

userSchema.pre("save", async function () {
   // Generate salt
   //  const salt = await bcrypt.genSalt(12);

   this.password = await bcrypt.hash(this.password, 13);
});

const User = model("User", userSchema);

export default User;
