import React, { useState } from 'react';
import { updateTask, deleteTask } from '../services/api';
import '../styles/taskItem.css';

const TaskItem = ({ task, onTaskDeleted, onTaskUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    completed: task.completed
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData({
      ...editData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await updateTask(task._id, editData);
      
      if (response.data.status === 'success') {
        onTaskUpdated(response.data.data.task);
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task._id);
        onTaskDeleted(task._id);
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  const handleToggleComplete = async () => {
    try {
      const response = await updateTask(task._id, {
        completed: !task.completed
      });
      
      if (response.data.status === 'success') {
        onTaskUpdated(response.data.data.task);
      }
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const priorityColors = {
    low: '#4caf50',
    medium: '#ff9800',
    high: '#f44336'
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="edit-form">
          {error && <div className="error-message">{error}</div>}

          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="edit-title"
          />

          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
            className="edit-description"
            rows="3"
          ></textarea>

          <div className="edit-row">
            <select
              name="priority"
              value={editData.priority}
              onChange={handleChange}
              className="edit-priority"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <label className="edit-checkbox">
              <input
                type="checkbox"
                name="completed"
                checked={editData.completed}
                onChange={handleChange}
              />
              Completed
            </label>
          </div>

          <div className="edit-actions">
            <button
              onClick={handleSave}
              disabled={loading}
              className="btn-save"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="task-checkbox"
        />

        <div className="task-info">
          <h3 className="task-title">{task.title}</h3>
          {task.description && <p className="task-description">{task.description}</p>}

          <div className="task-meta">
            <span
              className="task-priority"
              style={{ backgroundColor: priorityColors[task.priority] }}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>

            {task.dueDate && (
              <span className="task-due-date">
                📅 {formatDate(task.dueDate)}
              </span>
            )}

            <span className="task-created">
              Created: {formatDate(task.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="btn-edit"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="btn-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
