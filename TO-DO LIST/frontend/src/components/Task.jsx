import axios from 'axios';
import React, { useState } from 'react'

const Task = ({id,onUpdate,task}) => {
  const[edit,setEdit] = useState(false);
  const[taskEdit,setTaskEdit] = useState(task)
  const handleEdit = () => {
    console.log(id)
    axios.put(`http://localhost:5000/updateTask/${id}`, {task:taskEdit})
      .then((response) => {  
        console.log(`User updated successfully: ${response.data.message}`);
        onUpdate();
        setEdit(false);
      })  
      .catch((error) => {  
        console.log(`Error updating user: ${error.message}`);  
      })
  }
  const handleDelete = () => {
    axios.delete(`http://localhost:5000/delete/${id}`)
    .then((response)=> {
      onUpdate();
      console.log("Completed");
    })
  }
  return (
    <div className='task'>
        {
          edit? 
            <input
              type='text'
              value={taskEdit}
              onChange={(e)=>setTaskEdit(e.target.value)}
            />: 
            <p style={{fontSize: "20px",fontWeight:"500"}}>{task}</p>
        }
        <span>
            {
              edit?" ":<button title="Complete" onClick={()=>handleDelete()} style={{cursor:"pointer"}}><span className="material-symbols-outlined">check</span></button>
            }
            {edit?<button title="Save" onClick={()=>handleEdit()} style={{cursor:"pointer"}}><span className="material-symbols-outlined">done_all</span></button>:
            <button title='Edit' onClick={()=>setEdit(!edit)} style={{cursor:"pointer"}}><span className="material-symbols-outlined">edit</span></button>}
        </span>
    </div>

  )
}

export default Task
