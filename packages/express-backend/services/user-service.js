import UserSchema from "../models/user.js";
import mongoose, { Schema } from "mongoose";

const User = mongoose.model("user", UserSchema);

function findAllUsers() {
return User.find();
}

function findUserByName(name) {
return User.find({ name: name });
}
function findUserById(id) {
return User.findById(id);
}

function addUser(user) {
    const userToAdd = new User(user);
    return userToAdd.save(); // returns Promise
}

export default { findAllUsers, findUserById, findUserByName, addUser};
