const router = require("express").Router();
const taskController = require("../controller/task-controller");

const protect = require("../controller/verifyToken");

router.get("/tasks",protect,taskController.getTasks);
router.post('/tasks',protect,taskController.addTask);
router.delete('/tasks/:index',protect,taskController.deleteTask);


module.exports = router;