import React, { useEffect, useState } from 'react'
import axios from '../api/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/form.css'

export default function EditTask() {
  const { id } = useParams()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const nav = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/tasks/${id}`)
        setTask(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTask()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/tasks/${id}`, task)
      nav('/tasks')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update task')
    }
  }

  if (loading) return <div className="center">Loading...</div>
  if (!task) return <div>Task not found</div>

  return (
    <div className="form-wrap">
      <h2>Edit Task</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} required />
        <label>Description</label>
        <textarea value={task.description || ''} onChange={e => setTask({ ...task, description: e.target.value })} />
        <label>Category</label>
        <input value={task.category || ''} onChange={e => setTask({ ...task, category: e.target.value })} />
        <label>Priority</label>
        <select value={task.priority} onChange={e => setTask({ ...task, priority: e.target.value })}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <label>Status</label>
        <select value={task.status} onChange={e => setTask({ ...task, status: e.target.value })}>
          <option>Pending</option>
          <option>Completed</option>
        </select>
        <label>Due Date</label>
        <input type="date" value={task.dueDate ? new Date(task.dueDate).toISOString().slice(0,10) : ''} onChange={e => setTask({ ...task, dueDate: e.target.value })} />
        <button className="btn">Save</button>
      </form>
    </div>
  )
}
