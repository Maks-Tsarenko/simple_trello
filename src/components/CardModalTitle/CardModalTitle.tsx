import React from 'react';
import editBtn from '../../img/edit.svg';
import './CardModalTitle.scss';

type Props = {
  title: string,
  isEditing: boolean,
  onEdit: () => void,
  onBlur: () => void,
  onKeyUp: (e: React.KeyboardEvent<HTMLElement>) => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  dueDateColor: string,
}

export const CardModalTitle: React.FC<Props> = ({
  title,
  isEditing,
  onEdit,
  onBlur,
  onKeyUp,
  onChange,
  dueDateColor,
}) => {
  return (
    <div className={`card-modal-title__header card-modal-title__header${dueDateColor}`}>
      {isEditing ? (
        <input
          className="card-modal-title__data card-modal-title__data--title"
          value={title}
          onChange={onChange}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
          autoFocus />
      ) : (
        <h3 className="card-modal-title__header-title">
          {title}
          <button
            className="card-modal-title__btn-title"
            onClick={onEdit}
          >
            <img className="card__btnImg" src={editBtn} alt="edit button img" />
          </button>
        </h3>
      )}
    </div>
  );
};

export const CardModalTitleO: React.FC<Props> = ({
  title, isEditing, onEdit, onBlur, onKeyUp, onChange, dueDateColor,
}) => {
  return (
    <div className={`card-modal-title__header card-modal-title__header${dueDateColor}`}>
      {isEditing ? (
        <input
          className="card-modal-title__input"
          value={title}
          onChange={onChange}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
          autoFocus />
      ) : (
        <h3 className="card-modal-title__title">
          {title}
          <button
            className="card-modal-title__edit-btn"
            onClick={onEdit}
          >
            <img className="card-modal-title__edit-img" src={editBtn} alt="edit button img" />
          </button>
        </h3>
      )}
    </div>
  );
};
