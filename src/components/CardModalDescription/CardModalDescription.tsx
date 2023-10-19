import React from 'react';
import descripLogo from '../../img/description.svg';
import closeBtn from '../../img/Close.svg';
import './CardModalDescription.scss';

type Props = {
  isEditing: boolean,
  description: string | null,
  editedDescription: string,
  onEdit: () => void,
  onSave: (e: React.MouseEvent) => void,
  onCancel: () => void,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
};

export const CardModalDescription: React.FC<Props> = ({
  isEditing,
  description,
  editedDescription,
  onEdit,
  onSave,
  onCancel,
  onChange,
}) => {
  return (
    <div className="card-modal-description">
      <div className="card-modal-description__header">
        <img className="card-modal-description__icon" src={descripLogo} alt="icon" />
        <h3 className="card-modal-description__title">Description</h3>
      </div>

      {isEditing ? (
        <>
          <textarea
            className="card-modal-description__data card-modal-description__data--description"
            value={editedDescription}
            onChange={onChange}
            autoFocus
          ></textarea>

          <div className="card-modal-description__btns">
            <button
              onClick={onSave}
              className="card-modal-description__btn card-modal-description__btn--save">
              Save
            </button>
            <button
              onClick={onCancel}
              type="button"
              className="card-modal-description__btn card-modal-description__btn--close">
              <img src={closeBtn} alt="close button" />
            </button>
          </div>
        </>
      ) : (
        <div
          onClick={onEdit}
          className="card-modal__description"
        >
          <div className="card-modal-description__content">
            {description ? description : (<div>Add description...</div>)}
          </div>
        </div>
      )}
    </div>
  );
};
