import mongoose from "mongoose";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";

export interface IUser extends mongoose.Document {
  email?: string;
  password?: string;
  comparePassword(candidatePassword: string): boolean;
}

export interface IUserModel extends mongoose.Model<IUser> {
}

// User account
const UserSchema = new mongoose.Schema<IUser, IUserModel>({
  email: { type: String, unique: true },
  password: String,
});

UserSchema.pre<IUser>("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  
  // Hash the password synchronously.
  const salt = genSaltSync(10);
  user.password = hashSync(user.password!, salt);
  next();
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword: string): boolean {
  return compareSync(candidatePassword, this.password!);
};

const User = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;