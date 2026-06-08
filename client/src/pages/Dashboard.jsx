import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTasks, logout } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import '../styles/dashboard.css';

const Dashboard = ({ setIsAuthenticated }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {};

      if (filter !== 'all') {
        params.completed = filter === 'completed';
      }

      if (sortBy) {
        params.sortBy = sortBy;
      }

      const response = await getAllTasks(params);
      
      if (response.data.status === 'success') {
        setTasks(response.data.data.tasks);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter, sortBy]);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Task Manager</h1>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="tasks-sidebar">
          <h3>Filters</h3>
          <div className="filter-group">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Tasks
            </button>
            <button
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>

          <h3>Sort By</h3>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="createdAt">Newest First</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <div className="tasks-main">
          <TaskForm onTaskAdded={handleTaskAdded} />

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : tasks.length > 0 ? (
            <TaskList 
              tasks={tasks}
              onTaskDeleted={handleTaskDeleted}
              onTaskUpdated={handleTaskUpdated}
            />
          ) : (
            <div className="empty-state">
              <p>No tasks yet. Create one to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
