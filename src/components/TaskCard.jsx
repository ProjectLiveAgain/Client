import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
// import { statusUpdate } from '../../../server/controllers/taskController'

export default function TaskCard({ task, onDelete,statusUpdate }) {

  

  return (
    <div className={`task-card ${task.status === 'Completed' ? 'completed' : ''}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-meta">
          <span className="priority">{task.priority}</span>
          <span className={task.status === 'Completed'?'task-complete':'task-pending'}>{task.status}</span>
        </div>
      </div>
      <p className="task-desc">{task.description}</p>
      <div className="task-footer">
        <small>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</small>
        <div>
          {task.status ==='Completed'?(''):(<Link to={`/tasks/edit/${task._id}`} className="btn small">Edit</Link>)}
          
          <button className="btn small danger" onClick={() => onDelete(task._id)}>Delete</button>
          {task.status ==='Completed'?(''):(<button  className="done " onClick={() => statusUpdate(task._id)}>Done</button>)} 
          {/* <button disabled={task.status === 'Completed'} className="done " onClick={() => statusUpdate(task._id)}>Done</button> */}
        </div>
      </div>
    </div>
  )
}
