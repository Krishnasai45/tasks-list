const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/userModel");


const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const userExists = await Admin.findOne({ email });

    const encryptedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10)
    );
    if (userExists) {
      throw new Error("Account already exists");
    }

    const newUser = await new Admin({
      email,
      password: encryptedPassword,
      name,
    });
    await newUser.save();

    res.json({
      message: `${name} registered Successfully`,
      isRegisterd : true,
      email,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });

    if (!user) {
      throw new Error("Account doesn't exists");
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (passwordCheck) {
      const { emailDb } = user;
      const data = { email: emailDb };
      const authToken = jwt.sign(data, process.env.SECRET_KEY_TO_ACCESS);
      res.json({
        email: email,
        error: false,
        authToken,
        user,
        message: "Logged in successfully",
      });
    } else {
      throw new Error("Wrong password");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const usersList = (req,res)=>{
    Admin.find()
    .then((users)=>{
        res.json({users})
    }).catch(err=>{
        res.status(400).json("Error: " + err)
    })
}

module.exports = { registerUser, loginUser, usersList};
