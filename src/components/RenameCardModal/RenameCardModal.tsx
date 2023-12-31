import React from 'react';
import './RenameCardModal.scss';

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
          <button
            className="modal__btn modal__btn--save"
            onClick={handleSaveButton}
          >
            Save
          </button>

          <button
            className="modal__btn modal__btn--remove"
            onClick={(e) => onRemoveCard(e)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

