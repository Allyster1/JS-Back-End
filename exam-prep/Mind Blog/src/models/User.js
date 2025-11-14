import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
   username: {
      type: String,
      minLength: [5, "Username should be at least 5 characters"],
      required: [true, "Username is required!"],
   },
   email: {
      type: String,
      minLength: [10, "Email should be at least 10 characters"],
      required: [true, "Email is required!"],
   },
   password: {
      type: String,
      minLength: [4, "Password should be at least 4 characters"],
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
