import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
   email: {
      type: String,
      minLength: [10, "The email should be at least 10 characters long"],
      required: [true, "Email is required!"],
   },
   password: {
      type: String,
      minLength: [4, "The password should be at least 4 characters long"],
      required: [true, "Password is required!"],
   },
});

// userSchema
//    .virtual("repeatPassword")
//    .get(function () {
//       return this._repeatPassword;
//    })
//    .set(function (value) {
//       this._repeatPassword = value;
//    });

// userSchema.pre("validate", async function () {
//    if (this.isNew && this.password !== this._repeatPassword) {
//       throw new Error("Password missmatch");
//    }
// });

userSchema.pre("save", async function () {
   this.password = await bcrypt.hash(this.password, 12);
});

const User = model("User", userSchema);

export default User;
