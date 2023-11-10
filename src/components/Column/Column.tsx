import { useDrop } from 'react-dnd';
import './Column.scss';
import React, { useState } from 'react';
import { ColumnTypes } from 'types/ColumnTypes';
import { useAppDispatch } from 'store/hooks';
import { addCard, moveCard, renameColumn } from 'slices/columnSlice';
import { CardTypes } from 'types/CardTypes';
import { ColumnHeader } from 'components/ColumnHeader';
import { CardList } from 'components/CardList';
import { CardInput } from 'components/CardInput';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  column: ColumnTypes,
};

export const Column: React.FC<Props> = ({
  column,
}) => {
  const {
    id,
    name,
    cards,
  } = column;
  const [isEditing, setIsEditing] = useState(false);
  const [editedColumnName, setEditedColumnName] = useState(name);
  const [cardName, setCardName] = useState('');
  const [isCardInputVisible, setIsCardInputVisible] = useState(false);
  const dispatch = useAppDispatch();

  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item: any, monitor) => {
      if (item.columnId === id) {
        dispatch(moveCard({
          cardId: item.id,
          fromColumnId: item.columnId,
          toColumnId: id,
          targetIndex: monitor.getItem().index,
        }));
      } else {
        dispatch(moveCard({
          cardId: item.id,
          fromColumnId: item.columnId,
          toColumnId: id,
        }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleEditName = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedColumnName(e.target.value);
  };

  const handleSaveName = () => {
    setIsEditing(false);

    if (editedColumnName.trim()) {
      dispatch(renameColumn({ id, newName: editedColumnName }));
    }
  };

  const handleKeyUpColumnName = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleSaveName();
    }
  };

  const handleCardNameSet = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setCardName(textarea.value);

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.max(textarea.scrollHeight, 40)}px`;
  };

  const handleAddCard = () => {
    if (cardName.trim() === '') {
      return;
    }

    const newCard: CardTypes = {
      id: Date.now(),
      name: cardName,
      columnId: column.id,
    };

    dispatch(addCard({ id, card: newCard }));
    setCardName('');
    setIsCardInputVisible(false);
  }

  const handleKeyUpCardName = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleAddCard();
    }
  };

  const handleVisibleAddCard = () => {
    setIsCardInputVisible(!isCardInputVisible);
    setCardName('');
  };

  return (
    <section
      className="column"
      ref={drop}
    >
      <div className="column__content">
        <ColumnHeader
          columnId={id}
          isEditing={isEditing}
          onEditName={handleEditName}
          onNameChange={handleNameChange}
          onSaveName={handleSaveName}
          onKeyUp={handleKeyUpColumnName}
          name={name}
          editedColumnName={editedColumnName}
        />

        <div className="column__cards">
          <CardList
            columnId={column.id}
            cards={cards}
          />
        </div>
      </div>

      {isCardInputVisible ? (
        <CardInput
          cardName={cardName}
          onCardNameSet={handleCardNameSet}
          onAddCard={handleAddCard}
          onCancelAddCard={handleVisibleAddCard}
          onKeyUpCardName={handleKeyUpCardName}
        />
      ) : (
        <Button
          variant="contained"
          type="submit"
          onClick={handleVisibleAddCard}

          sx={{
            justifyContent: 'flex-start',
            bgcolor: '#eaecec',
            width: '100%',
            ':hover': { bgcolor: '#d5d8db' },
            color: '#333',
          }}
          startIcon={<AddIcon />}
        >
          Add Card
        </Button>
      )}
    </section>
  )
};
