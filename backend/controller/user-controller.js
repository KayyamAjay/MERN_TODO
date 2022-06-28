const { validationResult } = require("express-validator");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/HttpError");

const getAllUsers = async (req, res) => {
  const users = await User.find({},"-password");//to get all users without passwords
  res.json({ users });
};

const getUserById = async (req, res) => {
  const id = req.params.uid;
  const user = await User.findById({ _id: id },"-password");
  res.send({ user });
};

const signUp = async (req, res) => {
  const errors = validationResult(req);
  let hashPassword=''
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs,please check again", 422);
  }
  const { email, password } = req.body;
  if(password){
   hashPassword = await bcrypt.hash(password,10);
  }
  const existinguser = await User.findOne({ email: email });
  if (!existinguser) {
    const createUser = await User.create({
      email,
      password:hashPassword,
    });
   
    const token =  jwt.sign({id:createUser._id},process.env.SECRET)
      res.header('auth-token').json({token,createUser});
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
  let hashPassword = await bcrypt.compare(password,existinguser.password); // returns true or false
  if (!existinguser) {
    res.json({ message: "No User found, Please Signup to continue!" });
  } else {
    if (!hashPassword) {
      res.json("invalid password");
    }
    if (existinguser && hashPassword) {
      const token = jwt.sign({id:existinguser._id},process.env.SECRET)
      res.header('auth-token').send(token);
    }
  }
  //   if (!validUser || validUser.password !== password) {
  //     res.send({ message: "invalid User,or Check email or password again" });
  //   }
  //   res.json({ message: "Logged in succesfully" });
};


exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.signUp = signUp;
exports.login = login;


