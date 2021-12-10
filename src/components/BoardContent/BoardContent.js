import React, { useEffect, useRef, useState } from 'react'
import CardColumn from 'components/CardColumn/CardColumn'
import { initialData } from 'actions/initialData.js'
import { isEmpty } from 'lodash'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap'
import './BoardContent.scss'

import { Container, Draggable } from 'react-smooth-dnd'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const newColumnInputRef = useRef(null)

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

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
    }
  }, [openNewColumnForm])

  if (isEmpty(board)) {
    return <div className='not-found'>Board not found</div>
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)

    let newBoards = { ...board }
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

  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const addNewColumn = () => {
    if (newColumnTitle.length === 0) {
      newColumnInputRef.current.focus()
      return
    }
    const newColumnToAdd = {
      id: Math.random().toString(36).substr(2, 5), // handle random Id
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardorder: [],
      cards: []
    }

    let newColumns = [...columns]
    newColumns.push(newColumnToAdd)

    let newBoards = { ...board }
    newBoards.columns = newColumns
    newBoards.columnorder = newColumns.map((c) => c.id)
    setColumns(newColumns)
    setBoard(newBoards)

    setNewColumnTitle('')
    toggleOpenNewColumnForm()
  }

  const onNewColumnTitleChange = (e) => {
    setNewColumnTitle(e.target.value)
  }

  const onUpdateColumn = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate.id
    let newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex( i => i.id === columnIdToUpdate )
    if (newColumnToUpdate._destroy) {
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
    }

    let newBoards = { ...board }
    newBoards.columns = newColumns
    newBoards.columnorder = newColumns.map((c) => c.id)

    setColumns(newColumns)
    setBoard(newBoards)
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
            <CardColumn column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn}/>
          </Draggable>
        ))}
      </Container>

      <BootstrapContainer className='tripleh-trello-container'>
        {!openNewColumnForm && (
          <Row>
            <Col className='add-new-column' onClick={toggleOpenNewColumnForm}>
              <i className='fa fa-plus icon' /> Add another column
            </Col>
          </Row>
        )}
        {openNewColumnForm && (
          <Row>
            <Col className='enter-new-column'>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Enter column title...'
                className='input-enter-new-column'
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={(e) => {e.key === 'Enter' && addNewColumn()}}
              />
              <Button variant='success' size='sm' onClick={addNewColumn}>
                Add column
              </Button>
              <span className='cancel-new-column' onClick={toggleOpenNewColumnForm}>
                <i className='fa fa-trash icon' />
              </span>
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  )
}

export default BoardContent
