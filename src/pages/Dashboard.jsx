import React, { useEffect, useState } from 'react'
import axios from '../api/axiosInstance'
import '../styles/dashboard.css'

export default function Dashboard() {
  const [stats, setStats] = useState({ totalTasks: 0, completedTasks: 0, pendingTasks: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/dashboard/stats')
        setStats(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) return <div className="center">Loading...</div>

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-box">
          <h3>{stats.totalTasks}</h3>
          <p>Total Tasks</p>
        </div>
        <div className="stat-box">
          <h3>{stats.completedTasks}</h3>
          <p>Completed</p>
        </div>
        <div className="stat-box">
          <h3>{stats.pendingTasks}</h3>
          <p>Pending</p>
        </div>
      </div>
    </div>
  )
}
