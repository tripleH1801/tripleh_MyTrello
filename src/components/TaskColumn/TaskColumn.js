import Task from "components/Task/Task";
import React from "react";
import "./TaskColumn.scss";

function TaskColumn() {
  return (
    <div className="column">
      <header>brainstorm</header>
      <ul className="task-list">
        <Task />
        <li className="task-item">new itemcard</li>
        <li className="task-item">new itemcard</li>
        <li className="task-item">new itemcard</li>
        <li className="task-item">new itemcard</li>
        <li className="task-item">new itemcard</li>
        <li className="task-item">new itemcard</li>
        <li className="task-item">new itemcard</li>
        <li className="task-item">new itemcard</li>
        <li className="task-item">new itemcard</li>
      </ul>
      <footer>another card</footer>
    </div>
  );
}

export default TaskColumn;
