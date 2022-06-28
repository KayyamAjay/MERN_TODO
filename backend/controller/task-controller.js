const User = require("../models/users");


const getTasks = async (req, res) => {
    const id = req.user.id;
   
    const olduser = await User.find({ _id: id },"-password");
    if (olduser) {
      tasks = olduser[0].task;
      res.json({ tasks });
    }
 };
 const addTask = async (req, res) => {
    const id = req.user.id;
    const newtask = req.body.task;
    const olduser = await User.find({ _id: id });
    let tasks = [...olduser[0].task, newtask];
  
    const user = await User.findOneAndUpdate(
      { _id: id },
      { ...id.task, task: tasks }
    );
    res.status(201).json({ message: "sucessfully added a task ", newtask });
  };
  

  const deleteTask = async (req, res) => {
    const index = req.params.index;
    const id = req.user.id;
    User.findById({ _id: id }, (err, doc) => {
      var array = [];
      doc.task.forEach((element, i) => {
        if (i != index) {
          array.push(element);
        }
      });
      
      doc.task = array;
      doc.save();
    });
    // const olduser = await User.find({ _id: id });
    // const taskname = olduser[0].task[index];
    // console.log(taskname);
    // const user = await User.updateOne({ _id: id }, { $pull: { task: taskname } });
    res.json({ message: "deleted" });
  };

exports.getTasks = getTasks;
exports.addTask = addTask;
exports.deleteTask = deleteTask;