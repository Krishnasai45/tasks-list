const express = require("express");
const { registerUser, loginUser,usersList } = require("../controller/authentication");
// const {
//   teacherData,
//   getTeachersDetails,
// } = require("../controllers/teachersControllers");
// const { authMiddleWare } = require("../middleWare/adminAuthCheck");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/usersList',usersList)



module.exports = router;
