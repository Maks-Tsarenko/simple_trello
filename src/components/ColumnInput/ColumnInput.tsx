import React from 'react';
import './ColumnInput.scss';
import closeBtn from '../../img/Close.svg';
import plusIcon from '../../img/Plus.svg';

type Props = {
  isVisible: boolean,
  columnName: string,
  onColumnNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onKeyUp: (e: React.KeyboardEvent<HTMLElement>) => void,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  onClose: () => void,
  onInputVisible: () => void,
};

export const ColumnInput: React.FC<Props> = ({
  isVisible,
  columnName,
  onColumnNameChange,
  onKeyUp,
  onSubmit,
  onClose,
  onInputVisible,
}) => {
  return isVisible ? (
    <form
      className="column-input"
      onSubmit={onSubmit}
    >
      <input
        className="column-input__field"
        value={columnName}
        onKeyUp={onKeyUp}
        onChange={onColumnNameChange}
        placeholder="Enter the title of the list"
        autoFocus
      />
      <div className="column-input__btn-group">
        <button
          className="column-input__btn column-input__btn--add"
        >
          Add Column
        </button>
        <button
          type="button"
          className="column-input__btn column-input__btn--close"
          onClick={onClose}
        >
          <img src={closeBtn} alt="close button" />
        </button>
      </div>
    </form>
  ) : (
    <div className="column-input__add">
      <button
        className="column-input__add-btn"
        onClick={onInputVisible}
      >
        <span className="column-input__icon">
          <img src={plusIcon} alt="add column button" />
        </span>
        <span className="column-input__label">Add the list</span>
      </button>
    </div>
  );
};
