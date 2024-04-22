const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const dotenv = require("dotenv")
const app = express()
const Tasks = require('./models/tasksModel')
const mainRoutes = require('./Routes/mainRoutes')
app.use(cors());
app.use(express.json());
dotenv.config();


mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => {
      if (error) console.log(`error connecting database : ${error}`);
      else console.log("Database is successfully connected");
    }
  );

app.get('/',(req,res)=>{
    res.send('Connection Success')
})


app.use("/", mainRoutes);

// app.post('/list', async (req, res) => {
//     try {
//         const newTask = new Tasks({
//             task: req.body.task,
//             description: req.body.description,
//             status: req.body.status,
//             assigned_to : req.body.assigned_to || "none"
//         });
//         await newTask.save();
//         res.status(201).send(newTask);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

app.get('/allList',(req,res)=>{
    Tasks.find()
    .then((tasks)=>{
        res.json({tasks})
    }).catch(err=>{
        res.status(400).json("Error: " + err)
    })
    
})

app.listen(3001,function(){
    console.log("connection successfull")
})