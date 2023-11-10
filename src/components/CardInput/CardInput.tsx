import React, { useRef } from 'react';
import './CardInput.scss';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

type Props = {
  cardName: string;
  onCardNameSet: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddCard: () => void;
  onCancelAddCard: () => void;
  onKeyUpCardName: (e: React.KeyboardEvent<HTMLElement>) => void;
};

export const CardInput: React.FC<Props> = ({
  cardName,
  onCardNameSet,
  onAddCard,
  onCancelAddCard,
  onKeyUpCardName,
}) => {
  const handleCardInputBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (e.relatedTarget === closeButtonRef.current) {
      onCancelAddCard();

    } else {
      if (cardName.trim()) {
        onAddCard();
      } else {
        onCancelAddCard();
      }
    }
  };

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="card-input">
      <div className="card-input__container">
        <TextField
          defaultValue={cardName}
          onBlur={handleCardInputBlur}
          onChange={onCardNameSet}
          onKeyUp={onKeyUpCardName}
          placeholder='Enter card name'
          sx={{
            width: '250px',
          }}
          multiline
          autoFocus
        />
      </div>

      <div className="card-input__actions">
        <Button
          variant="contained"
          type="submit"
          size='small'
          onClick={onCancelAddCard}
          sx={{
            height: '32px',
            marginRight: '16px',
          }}
        >
          Add card
        </Button>

        <Button
          onClick={onCancelAddCard}
          ref={closeButtonRef}
          variant="contained"
          type="submit"
          size='small'
          sx={{
            padding: '0',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#eaecec',
            height: '32px',
            minWidth: '40px',
            ':hover': { bgcolor: '#d5d8db' },
            color: '#333',
          }}
        >
          <CloseIcon />
        </Button>
      </div>
    </div>
  );
};

