const mongoose = require("mongoose");
const uniqueValidtor = require("mongoose-unique-validator");
// const listSchema = new mongoose.Schema({
//   name: String,
// });
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  task: [{ type: String }],
});

userSchema.plugin(uniqueValidtor);

// const List = mongoose.model("List", listSchema);
const User = mongoose.model("User", userSchema);

module.exports = User;
// module.exports = List;
