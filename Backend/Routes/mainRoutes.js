const express = require("express");
const { registerUser, loginUser,usersList } = require("../controller/authentication");
const {authMiddleWare} = require('../middleware/authMiddleWare')
const {newTask,updateTask,deleteTask} = require('../controller/tasks')
// const {
//   teacherData,
//   getTeachersDetails,
// } = require("../controllers/teachersControllers");
// const { authMiddleWare } = require("../middleWare/adminAuthCheck");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/usersList',usersList);
router.post('/addtask',authMiddleWare,newTask)
router.put('/taskUpdate/:id',authMiddleWare,updateTask)
router.delete('/deletetask/:id',deleteTask)
// router.use(authMiddleWare);


module.exports = router;
