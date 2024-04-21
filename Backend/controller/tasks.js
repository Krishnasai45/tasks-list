
const Tasks = require("../models/tasksModel");


const newTask = async (req, res) => {
  try {
    const {
    task,
    description,
    status,
    assigned_to} = req.body;


    const newTasks = await new Tasks({
        task,
        description,
        status,
        assigned_to,

    });
    await newTasks.save();

    res.status(201).send(newTasks).json({
      message: `${task} added Successfully`,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
    try {
      const { id } = req.params; 
      const { task, description, status, assigned_to } = req.body;
  
      const existingTask = await Tasks.findById({_id:id});
  
      if (!existingTask) {
        return res.status(404).json({
          message: `Task with ID ${_id} not found`
        });
      }
  
      if (task) {
        existingTask.task = task;
      }
      if (description) {
        existingTask.description = description;
      }
      if (status) {
        existingTask.status = status;
      }
      if (assigned_to) {
        existingTask.assigned_to = assigned_to;
      }
  
      const updatedTask = await existingTask.save();
  
      res.status(200).json({
        message: "Task updated successfully",
        data: updatedTask
      });
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  const deleteTask =  async (req, res) => {
    const { id } = req.params; 
  
    try {
      const deletedTask = await Tasks.findByIdAndDelete({_id:id});
  
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json({ message: 'Task deleted successfully', deletedTask });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


module.exports = { newTask, updateTask,deleteTask };