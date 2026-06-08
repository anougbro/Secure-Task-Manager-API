import React from 'react';
import TaskItem from './TaskItem';
import '../styles/taskList.css';

const TaskList = ({ tasks, onTaskDeleted, onTaskUpdated }) => {
  if (!tasks || tasks.length === 0) {
    return <div className="empty-state">No tasks to display</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onTaskDeleted={onTaskDeleted}
          onTaskUpdated={onTaskUpdated}
        />
      ))}
    </div>
  );
};

export default TaskList;
