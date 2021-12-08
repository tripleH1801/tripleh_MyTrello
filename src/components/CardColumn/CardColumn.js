import React from 'react'
import Card from 'components/Card/Card'
import { mapOrder } from 'utilities/sorts'
import './CardColumn.scss'

import { Container, Draggable } from 'react-smooth-dnd'

function CardColumn(props) {
  const { column } = props
  const cards = mapOrder(column.cards, column.cardorder, 'id')

  const onCardDrop = (dropResult) => {
    console.log(dropResult)
  }

  return (
    <div className='column'>
      <header className='column-drag-handle'>{column.title}</header>
      <div className='card-list'>
        <Container
          orientation='vertical'
          groupName='work-columns'
          onDrop={onCardDrop}
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
      </div>
      <footer>another card</footer>
    </div>
  )
}

export default CardColumn
