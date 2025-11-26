import React, { useState } from 'react'
import axios from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import '../styles/form.css'

export default function AddTask() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/tasks', { title, description, category, priority, dueDate })
      nav('/tasks')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create task')
    }
  }

  return (
    <div className="form-wrap">
      <h2>Add Task</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
        <label>Category</label>
        <input value={category} onChange={e => setCategory(e.target.value)} />
        <label>Priority</label>
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <label>Due Date</label>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        <button className="btn">Create</button>
      </form>
    </div>
  )
}
