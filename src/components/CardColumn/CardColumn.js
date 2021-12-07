import Card from "components/Card/Card";
import React from "react";
import { mapOrder } from "utilities/sorts";
import "./CardColumn.scss";

function CardColumn(props) {
  const { column } = props;
  const cards = mapOrder(column.cards, column.cardorder, "id");
  return (
    <div className="column">
      <header>{column.title}</header>
      <ul className="card-list">
        {cards.map((card, index) => (
          <Card card={card} />
        ))}
      </ul>
      <footer>another card</footer>
    </div>
  );
}

export default CardColumn;
