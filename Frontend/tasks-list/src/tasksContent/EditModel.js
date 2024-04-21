import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import "../styles/EditModal.css";
import axios from 'axios'

export const EditModal = ({ onSubmit, onCancel, closeModal, children,data}) => {
    const [status,setStatus] = useState(data.status)
    const [assign,setAssign] = useState(data.assigned_to)

    const handleSubmit =()=>{

        const tokenFromStorage = sessionStorage.getItem("token");
        const tokenWithoutPadding = tokenFromStorage.slice(1, -1);

        const params ={
            status:status,
            assigned_to : assign
        }
        axios({
            method: "PUT",
            url: `http://localhost:3001/taskUpdate/${data._id}`,
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
                <h1><b>{data.task}</b></h1>
                <div className="editModal-content">
                    <p><b>{data.description}</b></p>
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