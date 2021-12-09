import React, { useEffect, useState } from 'react'
import './BoardContent.scss'
import CardColumn from 'components/CardColumn/CardColumn'
import { initialData } from 'actions/initialData.js'
import { isEmpty } from 'lodash'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'

import { Container, Draggable } from 'react-smooth-dnd'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const BoardFromDb = initialData.boards.find(
      (board) => board.id === 'board-1'
    )
    if (BoardFromDb) {
      setBoard(BoardFromDb)
      setColumns(mapOrder(BoardFromDb.columns, BoardFromDb.columnorder, 'id'))
    }

    return () => {}
  }, [])
  if (isEmpty(board)) {
    return <div className='not-found'>Board not found</div>
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns]
    let newBoards = { ...board }

    newColumns = applyDrag(newColumns, dropResult)
    newBoards.columns = newColumns
    newBoards.columnorder = newColumns.map((c) => c.id)

    setColumns(newColumns)
    setBoard(newBoards)
  }

  const onCardDrop = (columnID, dropResult) => {
    const { addedIndex, removedIndex } = dropResult
    if (addedIndex !== null || removedIndex !== null) {
      let newColumns = [...columns]
      let currentColumn = newColumns.find((c) => c.id === columnID)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardorder = currentColumn.cards.map((c) => c.id)

      setColumns(newColumns)
    }
  }
  return (
    <div className='board-content'>
      <Container
        orientation='horizontal'
        onDrop={onColumnDrop}
        dragHandleSelector='.column-drag-handle'
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'columns-drop-preview'
        }}
        getChildPayload={(index) => columns[index]}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <CardColumn column={column} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>
      <div className='add-new-column'>
        <i className='fa fa-plus icon' /> Add another column
      </div>
    </div>
  )
}

export default BoardContent
