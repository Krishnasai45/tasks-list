import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import "../styles/EditModal.css";
import axios from 'axios'

export const AddModel = ({ onSubmit, onCancel, closeModal, children,data}) => {
    
    const [task,setTask] = useState('')
    const [disc,setDisc] = useState('')
    const [status,setStatus] = useState('')
    const [assign,setAssign] = useState()

    const handleSubmit =()=>{

        const tokenFromStorage = sessionStorage.getItem("token");
        const tokenWithoutPadding = tokenFromStorage.slice(1, -1);

        const params ={
            task:task,
            description :disc,
            status:status,
            assigned_to : assign
        }
        axios({
            method: "POST",
            url: `http://localhost:3001/addtask`,
            headers:{
              "Authorization":"Bearer "+ tokenWithoutPadding
            },
            data:params
          })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
            closeModal()
    }

    return (
        <div
            className="editModal-container"
            onClick={(e) => {
                if (e.target.className === "editModal-container")
                    closeModal();
            }}
        >
            <div className="editModal">
                <div className="editModal-header">
                    <div onClick={() => closeModal()} className="close"><FiX /></div>
                </div>
                <div style={{clear:'both'}}></div>
                <h1>Add New Task</h1>
                <div className="editModal-content">
                    <div className="task">
                        <label>Task Name</label> <br />
                        <input
                            name='task'
                            type="text"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </div>
                    <div className="disc">
                    <label>Description</label> <br />
                        <textarea name="description" value={disc} onChange={(e)=>setDisc(e.target.value)}/>
                    </div>
                    <div className="assign">
                        <label>Assigned</label> <br />
                        <input
                            name='assign'
                            type="text"
                            value={assign}
                            onChange={(e) => setAssign(e.target.value)}
                        />
                    </div>
                    <div className="status">
                    <label>Status</label> <br />
                    <select onChange={(e)=>setStatus(e.target.value)}>
                        <option value="todo">Todo</option>
                        <option value='in progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                    </select>
                    </div>

                </div>
                <div className="editModal-footer">
                    <div className="cancle" onClick={() => onCancel()}>
                        <b>Cancle</b>
                    </div>
                    <div className="send" onClick={handleSubmit}>
                        <b>Send</b>
                    </div>
                </div>
            </div>
        </div>
    );
};