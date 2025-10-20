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

// Validate passwords with virtual property
userSchema
   .virtual("rePassword")
   .get(function () {
      return this._rePassword;
   })
   .set(function (value) {
      this._rePassword = value;
   });

userSchema.pre("validate", async function () {
   if (this.isNew && this.password !== this.rePassword) {
      // throw new Error
      this.invalidate("rePassword", "Password missmatch");
   }
});

// Validate unique email on user creation
// userSchema.pre("validate", async function () {
//    const userExists = await this.constructor.exists({ email: userData.email });
//    if (userExists) throw new Error("User already exists!");
// });

userSchema.pre("save", async function () {
   // Generate salt
   //  const salt = await bcrypt.genSalt(12);

   this.password = await bcrypt.hash(this.password, 13);
});

const User = model("User", userSchema);

export default User;
