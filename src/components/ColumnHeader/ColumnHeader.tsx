import React, { useRef } from 'react';
import './ColumnHeader.scss';
// import closeBtn from 'img/Close.svg';
import { removeColumn } from 'slices/columnSlice';
import { useAppDispatch } from 'store/hooks';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  columnId: number,
  isEditing: boolean,
  name: string,
  editedColumnName: string,
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onEditName: () => void,
  onSaveName: () => void,
  onKeyUp: (e: React.KeyboardEvent<HTMLElement>) => void,
};

export const ColumnHeader: React.FC<Props> = ({
  columnId,
  isEditing,
  name,
  onNameChange,
  onEditName,
  onSaveName,
  onKeyUp,
  editedColumnName,
}) => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleDeleteColumn = () => {
    dispatch(removeColumn(columnId));
  };

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

      <Button
        onClick={handleDeleteColumn}
        variant="outlined"
        type="submit"
        size='small'
        sx={{
          padding: '0',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#fff',
          height: '32px',
          minWidth: '32px',
          border: 'none',
          color: '#333',
        }}
      >
        <CloseIcon
          sx={{
            width: '20px',
            height: '20px'
          }}
        />
      </Button>
    </div>
  );
}

