import TaskColumn from "components/TaskColumn/TaskColumn";
import React from "react";
import "./BoardContent.scss";

function BoardContent() {
  return (
    <div className="board-content">
      <TaskColumn />
      <TaskColumn />
      <TaskColumn />
      <TaskColumn />
      <TaskColumn />
    </div>
  );
}

export default BoardContent;
