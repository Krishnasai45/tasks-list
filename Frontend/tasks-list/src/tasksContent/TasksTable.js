import React, { useEffect, useState } from 'react'
import '../styles/ItemsTable.css';
import TableBody from './TableBody';
import { useSelector, useDispatch } from "react-redux";
import { taskListData } from '../redux/action';
import { AddModel } from './AddModel';

const TasksTable = () => {
    const dispatch = useDispatch();
    const tasksData = useSelector((state)=>state.tasks)
    const [data,setData] = useState(tasksData)
    const [model,setModel] = useState(false)

    const handleModelClose = () => {
        setModel(false)
    };

    useEffect(()=>{
        dispatch(taskListData())
    },[dispatch])
    useEffect(() => {
        console.log("Updated tasks data:", tasksData);
        setData(tasksData)
      }, [tasksData])

    return (
        <div className='ItemsTable'>
            <h1>Tasks List Table</h1>
            <div className='addButton' onClick={()=>setModel(true)}>Add Task</div>
            <table className='table'>
                <thead>
                    <tr>
                        <td className='brand'>Task Name</td>
                        <td className='pname'>Discription</td>
                        <td className='total'>Assigned</td>
                        <td className='status'>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(data)&&data.map((item,i)=>{
                            return(<TableBody data={item}/>)
                                
                        })
                    }
                </tbody>
            </table>
            {
                model && <AddModel
                closeModal={handleModelClose}
                onSubmit={handleModelClose}
                onCancel={handleModelClose}
                />
            }
        </div>
    )
}

export default TasksTable