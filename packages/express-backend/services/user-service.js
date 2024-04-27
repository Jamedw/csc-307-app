import userModel from "../models/user.js";
import mongoose, { Schema } from "mongoose";

mongoose.set("debug", true);

mongoose
  .connect("mongodb+srv://jamesdwyer771:d1A9NlgcOzovwQjl@cluster0.ddec14e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  })
  .catch((error) => console.log(error));


function getUsers(name,job) {
    let promise;
    if (name === undefined && job === undefined) {
      promise = userModel.find();
    } else if (name && !job) {
      promise = userModel.find({ name: name });
    } else if (job && !name) {
      promise = userModel.find({ name: name,  job : job});
    }
    return promise;
}

function deleteUser(id) {
  let promise = userModel.findByIdAndDelete({_id : id});
  return promise;
}

function findUserById(id) {
let promise = userModel.findById({_id : id});
return promise;
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

export default { getUsers, findUserById, addUser, deleteUser};
