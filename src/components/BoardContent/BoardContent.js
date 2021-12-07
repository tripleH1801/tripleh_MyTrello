import React, { useEffect, useState } from "react";
import "./BoardContent.scss";
import CardColumn from "components/CardColumn/CardColumn";
import { initialData } from "actions/initialData.js";
import { isEmpty } from "lodash";
import { mapOrder } from "utilities/sorts";

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const BoardFromDb = initialData.boards.find(
      (board) => board.id === "board-1"
    );
    if (BoardFromDb) {
      setBoard(BoardFromDb);
      setColumns(mapOrder(BoardFromDb.columns, BoardFromDb.columnorder, "id"));
      console.log(columns);
    }

    return () => {};
  }, []);
  if (isEmpty(board)) {
    return <div className="not-found">Board not found</div>;
  }
  return (
    <div className="board-content">
      {columns.map((column, index) => (
        <CardColumn key={index} column={column} />
      ))}
    </div>
  );
}

export default BoardContent;
