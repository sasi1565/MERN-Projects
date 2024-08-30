import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Task from './Task';

const ToDoapp = () => {
    const [taskVal,setTask] = useState("");
    const [tasks,setTasks] = useState([]);
    const fetchData = () => {
        axios.get("http://localhost:5000/getTasks")
        .then((res)=>{
            console.log(res.data);
            setTasks(res.data)
        }).catch((error) => {  
            console.error('Error fetching tasks:', error);  
        });
    }
    useEffect(()=> {
        fetchData();
    },[]) 
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/addTask",{task:taskVal})
        .then((res)=>{
            console.log("Added Successfully");
            fetchData();
            setTask("");
        }).catch((error) => {  
            console.error('Error fetching tasks:', error);  
        });
    }
  return (
    <>
    <div className='container '>
        <div className='to-do-list-area'>
            <form method='post' onSubmit={handleSubmit}>
                <input type='text' 
                    value= {taskVal} 
                    onChange={(e)=>setTask(e.target.value)} 
                    placeholder='Enter your task'
                />
                <button type='submit' ><span className="material-symbols-outlined">bookmark_add</span></button>
            </form>
            <div className='listArea'>
                <div style={{}}>
                    <h1>My Tasks</h1>
                </div>
                <div className='task-area'>
                    {
                        tasks.map((tk)=>(
                            <Task key={tk.id} id={tk.id} onUpdate={fetchData} task={tk.task}/>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ToDoapp
