import React from 'react';
import './RenameCardModal.scss';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  editedName: string
  onNameChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  onKeyUp: (e: React.KeyboardEvent<HTMLElement>) => void,
  onSave: () => void,
  onInputClick: (e: React.MouseEvent) => void,
  onRemoveCard: (e: React.MouseEvent) => void,
};

export const ModalRenameCard: React.FC<Props> = ({
  editedName,
  onNameChange,
  onKeyUp,
  onSave,
  onInputClick,
  onRemoveCard,
}) => {
  const handleSaveButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave();
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <textarea
          className="modal__input"
          value={editedName}
          onChange={onNameChange}
          onKeyUp={onKeyUp}
          onClick={onInputClick}
          autoFocus
          placeholder="Edit card name"
        />
        <div className="modal__btns">
          <Button
            onClick={handleSaveButton}
            className='button'
            variant="contained"
            type="submit"
          >
            Save
          </Button>

          <IconButton
            className='button'
            aria-label="delete"
            onClick={(e) => onRemoveCard(e)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

