import React, { useState, useRef } from 'react';
import './Card.scss';
import { CardTypes } from '../../types/CardTypes';
import editBtn from '../../img/edit.svg';
import { useAppDispatch } from '../../app/hooks';
import { moveCard, removeCard, renameCard } from '../../slices/columnSlice';
import { ModalRenameCard } from '../ModalRenameCard/ModalRenameCard';
import { CardModal } from '../CardModal/CardModal';
import { getColorBasedOnDate } from '../../helpers/functions/getColorBasedOnDate';
import { formatDate } from '../../helpers/functions/formatDate';
import { useDrag, useDrop } from 'react-dnd';
import { updateTextAreaHeight } from '../../helpers/functions/updateTextAreaHeight';

type Props = {
  card: CardTypes,
  columnId: number,
  index: number,
}

export const Card: React.FC<Props> = ({ card, columnId, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(card.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const ref = useRef(null);

  const [, drag] = useDrag({
    type: 'CARD',
    item: { id: card.id, columnId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (item: any, monitor) => {
      if (item.columnId !== columnId) {
        return;
      }
    
      const draggedIndex = item.index;
      const hoverIndex = index;
    
      if (draggedIndex === hoverIndex) {
        return;
      }
    
      const hoverBoundingRect = (ref.current as any).getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if(!clientOffset) {
        return;
      }

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    
      if (draggedIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (draggedIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
    
      dispatch(moveCard({
        cardId: item.id,
        fromColumnId: columnId,
        toColumnId: columnId,
        targetIndex: hoverIndex
      }));
    
      item.index = hoverIndex;
    }
  });
  
  drag(drop(ref));

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEditName = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setEditedName(textarea.value);
    updateTextAreaHeight(textarea, 40);
  };

  const handleNameImputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleSaveName = () => {
    setIsEditing(false);
    if (editedName.trim()) {
      dispatch(renameCard({ columnId, cardId: card.id, newName: editedName }));
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleSaveName();
    }
  };

  const handleInputChangeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleRemoveCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeCard({ columnId, cardId: card.id }));
  };

  let dueDateColor = '';
  if (card.dueDate) {
    dueDateColor = getColorBasedOnDate(card.dueDate);
  };

  return (
    <div
      className={`card card${dueDateColor}`}
      onClick={handleModalOpen}
      ref={ref}
    >
      <div
        className="card__modal"
      >
        {isModalOpen && (
          <CardModal
            card={card}
            onClose={handleModalClose}
            dueDateColor={dueDateColor}
            onSaveName={handleSaveName}
            editedName={editedName}
            onNameChange={handleNameImputChange}
          />
        )}
      </div>

      <div className="card__name">
        {isEditing ? (
          <ModalRenameCard
            editedName={editedName}
            onNameChange={handleNameChange}
            onKeyUp={handleKeyUp}
            onSave={handleSaveName}
            onInputClick={handleInputChangeClick}
            onRemoveCard={handleRemoveCard}
          />
        ) : (
          card.name
        )}
      </div>

      <button
        className="card__btnEdit"
        onClick={handleEditName}
      >
        <img className="card__btnImg" src={editBtn} alt="edit button img" />
      </button>

      {card.dueDate && (
        <div className="card__date">
          {`Expires on ${formatDate(card.dueDate)}`}
        </div>
      )}
    </div>
  );
};
