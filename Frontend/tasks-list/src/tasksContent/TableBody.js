import React, {  useState } from 'react'
import {  FiX } from "react-icons/fi";
import '../styles/ItemsTable.css';
import { EditModal } from './EditModel';
import axios from 'axios'



const TableBody = (props) => {
    const data = props.data
    const [editOpen,setOpenEdit] = useState(false);
    const color = data.status == "todo" ? 'red' : data.status == "in progress"? 'blue' : data.status == "completed" ?"green":""

    const handleEditClose = () => {
        setOpenEdit(false)
    };



    const handleDelete = () => {
        console.log("deleted")
        axios({
            method: "DELETE",
            url: `http://localhost:3001/deletetask/${data._id}`,
          })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }
    return (
        <>
            <tr>
                <td className='brand'> <div>{data.task}</div></td>
                <td className='pname'>{data.description}</td>
                <td className='total'>{data.assigned_to}</td>
                <td className='status mainStatus'>
                    <div className='leftStatus'>{data.status &&<div className='newStatus' style={{color:color}}>{data.status}</div>}</div>

                    <div className='actions'>
                    <div onClick={()=>setOpenEdit(true)}>Edit</div>
                      <div className='delete'><FiX  onClick={handleDelete} /></div>  
                    </div>
                </td>
            </tr>
            {editOpen && <EditModal
                closeModal={handleEditClose}
                onSubmit={handleEditClose}
                onCancel={handleEditClose}
                data={data}
            />}
        </>
    )
}

export default TableBody