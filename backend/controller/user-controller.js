const { validationResult } = require("express-validator");
const User = require("../models/users");
// const List  =require("../models/users");
const HttpError = require("../models/HttpError");

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json({ users });
};

const getUserById = async (req, res) => {
  const id = req.params.uid;
  const user = await User.findById({ _id: id });
  res.send({ user });
};

const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs,please check again", 422);
  }
  const { email, password } = req.body;
  const existinguser = await User.findOne({ email: email });
  if (!existinguser) {
    const createUser = new User({
      email,
      password,
    });
    createUser.save((err) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(201).json({ user: createUser });
  } else {
    res.json({ message: "User already exist, please login!" });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs,please check again", 422);
  }
  const { email, password } = req.body;
  const existinguser = await User.findOne({ email: email });
  console.log(existinguser);
  if (!existinguser) {
    res.json({ message: "No User found, Please Signup to continue!" });
  } else {
    if (existinguser.password !== password) {
      res.json("invalid password");
    }
    if (existinguser && existinguser.password === password) {
      res.json({ message: "Succesfully LoggedIn!", existinguser });
    }
  }
  //   if (!validUser || validUser.password !== password) {
  //     res.send({ message: "invalid User,or Check email or password again" });
  //   }
  //   res.json({ message: "Logged in succesfully" });
};
const addTask = async (req, res) => {
  const id = req.params.uid;
  const newtask = req.body.task;
  const olduser = await User.find({ _id: id });
  let tasks = [...olduser[0].task, newtask];

  const user = await User.findOneAndUpdate(
    { _id: id },
    { ...id.task, task: tasks }
  );
  res.status(201).json({ message: "sucessfully added a task ", newtask });
};

const getTasks = async (req, res) => {
  const id = req.params.uid;
  console.log(id);
  const olduser = await User.find({ _id: id });
  if (olduser) {
    tasks = olduser[0].task;
    res.json({ tasks });
  }
};

const deleteTask = async (req, res) => {
  const index = req.params.index;
  const id = req.params.uid;
  User.findById({ _id: id }, (err, doc) => {
    var array = [];
    doc.task.forEach((element, i) => {
      if (i != index) {
        array.push(element);
      }
    });
    console.log(array);
    doc.task = array;
    doc.save();
  });
  // const olduser = await User.find({ _id: id });
  // const taskname = olduser[0].task[index];
  // console.log(taskname);
  // const user = await User.updateOne({ _id: id }, { $pull: { task: taskname } });
  res.json({ message: "deleted" });
};

exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.signUp = signUp;
exports.login = login;
exports.addTask = addTask;
exports.getTasks = getTasks;
exports.deleteTask = deleteTask;
