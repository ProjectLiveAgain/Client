import React from 'react'
import { Link } from 'react-router-dom'

export default function TaskCard({ task, onDelete }) {
  return (
    <div className={`task-card ${task.status === 'Completed' ? 'completed' : ''}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-meta">
          <span className="priority">{task.priority}</span>
          <span className="status">{task.status}</span>
        </div>
      </div>
      <p className="task-desc">{task.description}</p>
      <div className="task-footer">
        <small>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</small>
        <div>
          <Link to={`/tasks/edit/${task._id}`} className="btn small">Edit</Link>
          <button className="btn small danger" onClick={() => onDelete(task._id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}
