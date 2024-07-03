import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  gender: String,
  avatar: String,
  tokens: [{ token: String }],
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
