import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
   username: {
      type: String,
      minLength: [6, "Username is too short!"],
      required: [true, "Username is required!"],
   },
   password: {
      type: String,
      minLength: [6, "Password is too short!"],
      required: [true, "Password is required!"],
   },
});

userSchema.pre("save", async function () {
   this.password = await bcrypt.hash(this.password, 10);
});

const User = model("USER", userSchema);

export default User;
