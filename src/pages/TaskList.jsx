import React, { useEffect, useMemo, useState } from "react";
import axios from "../api/axiosInstance";
import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { filteredSortedTask } from "../utils/filters.utility.js";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  // console.log(tasks)
  // Filters
  let [search, setSearch] = useState("");
  // const [searchdata,setSearchData] = useState(tasks)

  // Priority Filter States
  const [priority, setPriority] = useState("");

  // prority Med to High State
  const [sortorder, setSortOrder] = useState(null);

  //STATUS STATE
  const [status, setStatus] = useState("All");
  // const [filterStatus, setfilterStatus] = useState([])

  //  let settingstatus = setfilterStatus( tasks.filter((item) => item.status === "Completed"))

  //  console.log(completedTasks)
  console.log(status);

  const importFilter = useMemo(() => {
    return filteredSortedTask(tasks, search, priority, sortorder, status);
  }, [tasks, search, priority, sortorder, status]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //Status Update Api Logic
  const statusHandler = async (id) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      console.log(id);
      let statusupdate = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status: "Completed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((tasks) => {
        
        return tasks.map((item) => {
          return (
            // item._id===id ? {(status:'Completed')} : item
            item._id === id ? {...tasks, status: "Completed" } : item
          );
        });
      });
    } catch (error) {
      alert("Error on Status Update");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete task?")) return;
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="center">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h2>Your Tasks</h2>
        <div className="searching">
          <Link to="/tasks/add" className="btn">
            Add Task
          </Link>
        </div>
      </div>
      <div className="filterSection">
        <div className="line-height">
          <h5 className="top-head">Search</h5>

          <div id="searchinput">
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter your query"
            />
            <CiSearch
              style={{
                fontSize: "1.5rem",
                position: "relative",
                right: "0rem",

                // top: px",
              }}
            />
          </div>
        </div>
        {/* PRIORITY FILTER STARTS HERE  */}
        <div className="priorityFilter line-height">
          <h5 className="top-head">Priority Filter</h5>
          <select
            className="priorityList"
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* SORT BY PRIORITY  */}
        <div className="sortbypriority line-height">
          <h5 className="top-head">Sort By Priority</h5>
          <select
            className="priorityList"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value={"reset"}>-------Select------</option>
            <option value={"high"}>High - Medium - Low</option>
            <option value={"low"}>Low - Medium - High</option>
          </select>
        </div>

        {/* Sort by Status  */}
        <div className="priorityFilter line-height">
          <h5 className="top-head">Task Status</h5>
          <select
            className="priorityList"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {importFilter.length === 0 ? (
        <p>No matching tasks</p>
      ) : (
        <div className="tasks-grid">
          {importFilter.map((item) => (
            <TaskCard
              key={item._id}
              task={item}
              onDelete={handleDelete}
              statusUpdate={statusHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
}
