const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const dotenv = require("dotenv")
const app = express()
const User = require('./models/userModel')
const Tasks = require('./models/tasksModel')
const mainRoutes = require('./Routes/mainRoutes')
app.use(cors());
app.use(express.json());
dotenv.config();

// mongoose.connect("mongodb+srv://yamanikrishnasai45:AfYw1xvAePNLygJo@task-list-cluster.ztd14gw.mongodb.net/?retryWrites=true&w=majority&appName=task-list-cluster")

mongoose.connect(
    process.env.MONGO_DB,    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (error) => {
      if (error) console.log(`error connecting database : ${error}`);
      else console.log("Database is successfully connected");
    }
  );

app.get('/',(req,res)=>{
    res.send('Connection Success')
})


app.use("/", mainRoutes);

// app.post('/user', async (req, res) => {
//     try {
//         const newUser = new User({
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password
//         });
//         await newUser.save();
//         res.status(201).send(newUser);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// app.get('/allusers',(req,res)=>{
//     User.find()
//     .then((users)=>{
//         res.json({users})
//     }).catch(err=>{
//         res.status(400).json("Error: " + err)
//     })
    
// })

app.listen(3001,function(){
    console.log("connection successfull")
})