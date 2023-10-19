import React from 'react';
import { Card } from '../Card/Card';
import { CardTypes } from '../../types/CardTypes';

type Props = { 
  cards: CardTypes[],
  columnId: number,
}

export const CardList: React.FC<Props> = ({ cards, columnId }) => (
  <>
    {cards.map((card, index) => (
      <div
        key={card.id}
        className="column__card"
      >
        <Card
          columnId={columnId}
          card={card}
          index={index} />
      </div>
    ))}
  </>
);
