import React, { useRef } from 'react';
import './ColumnHeader.scss';
import closeBtn from '../../img/Close.svg';

type Props = {
  isEditing: boolean,
  name: string,
  editedColumnName: string,
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onEditName: () => void,
  handleDeleteColumn: () => void,
  onSaveName: () => void,
  onKeyUp: (e: React.KeyboardEvent<HTMLElement>) => void,
};

export const ColumnHeader: React.FC<Props> = ({
  isEditing,
  name,
  onNameChange,
  onEditName,
  handleDeleteColumn,
  onSaveName,
  onKeyUp,
  editedColumnName,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="column-header">
      <h3 className="column-header__title" onClick={onEditName}>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="column-header__input"
            value={editedColumnName}
            onChange={onNameChange}
            onBlur={onSaveName}
            onKeyUp={onKeyUp}
            autoFocus />
        ) : (
          name
        )}
      </h3>

      <button className="column-header__btn-delete" onClick={handleDeleteColumn}>
        <img src={closeBtn} alt="close button" />
      </button>
    </div>
  );
}

