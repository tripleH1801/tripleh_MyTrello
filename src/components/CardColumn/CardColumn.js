import React, { useEffect, useRef, useState } from 'react'
import Card from 'components/Card/Card'
import { mapOrder } from 'utilities/sorts'
import { Dropdown, Form, Button } from 'react-bootstrap'
import { Container, Draggable } from 'react-smooth-dnd'
import ConfirmModal from 'components/common/ConfirmModal'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'

import './CardColumn.scss'
import {
  saveContentAfterEnter,
  selectAllInlineText
} from 'utilities/contentEditable'
import { cloneDeep } from 'lodash'

function CardColumn(props) {
  const { column, onCardDrop, onUpdateColumn } = props

  const cards = mapOrder(column.cards, column.cardorder, 'id')

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const toggleConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = (e) => setColumnTitle(e.target.value)

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)

  const newCardTextAreaRef = useRef(null)

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  useEffect(() => {
    if (newCardTextAreaRef && newCardTextAreaRef.current) {
      newCardTextAreaRef.current.focus()
      newCardTextAreaRef.current.select()
    }
  }, [openNewCardForm])

  const onModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleConfirmModal()
  }

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
  }

  const addNewCard = () => {
    if (newCardTitle.length === 0) {
      newCardTextAreaRef.current.focus()
      return
    }
    const newCardToAdd = {
      id: Math.random().toString(36).substr(2, 5),
      boardId: column.boardId,
      columnId: column.id,
      title: newCardTitle,
      cover: null
    }

    let newColumns = cloneDeep(column)
    newColumns.cards.push(newCardToAdd)
    newColumns.cardorder.push(newCardToAdd.id)

    onUpdateColumn(newColumns)

    // console.log(newColumns)
    // console.log(column)

    setNewCardTitle('')
    toggleOpenNewCardForm()
  }

  return (
    <div className='column'>
      <header className='column-drag-handle'>
        <div className='column-title'>
          <Form.Control
            size='sm'
            type='text'
            className='tripleh-content-editable'
            value={columnTitle}
            spellCheck='false'
            onClick={selectAllInlineText}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterEnter}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
        <div className='column-dropdown-actions'>
          <Dropdown>
            <Dropdown.Toggle
              id='dropdown-basic'
              size='sm'
              className='dropdown-btn'
            />

            <Dropdown.Menu>
              <Dropdown.Item>Add card</Dropdown.Item>
              <Dropdown.Item onClick={toggleConfirmModal}>
                Remove column...
              </Dropdown.Item>
              <Dropdown.Item>
                Move all card in this column (update soon)...
              </Dropdown.Item>
              <Dropdown.Item>
                Archive all card in this column (update soon)...
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className='card-list'>
        <Container
          orientation='vertical'
          groupName='work-columns'
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass='card-ghost'
          dropClass='card-ghost-drop'
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
        {openNewCardForm && (
          <div className='add-new-card-area'>
            <Form.Control
              size='sm'
              as='textarea'
              row={3}
              placeholder='Enter a title of this card...'
              className='textarea-enter-new-card'
              ref={newCardTextAreaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={(e) => {
                e.key === 'Enter' && addNewCard()
              }}
            />
          </div>
        )}
      </div>
      <footer>
        {openNewCardForm && (
          <div className='add-new-card-action'>
            <Button variant='success' size='sm' onClick={addNewCard}>
              Add card
            </Button>
            <span className='cancel-icon' onClick={toggleOpenNewCardForm}>
              <i className='fa fa-trash icon' />
            </span>
          </div>
        )}
        {!openNewCardForm && (
          <div className='footer-action' onClick={toggleOpenNewCardForm}>
            <i className='fa fa-plus icon' /> Add another card
          </div>
        )}
      </footer>
      <ConfirmModal
        show={showConfirmModal}
        onAction={onModalAction}
        title='Remove column'
        content={`Do you sure to remove <strong>${column.title}</strong>? <br/ >All related cards will also be removed!`}
      />
    </div>
  )
}

export default CardColumn
