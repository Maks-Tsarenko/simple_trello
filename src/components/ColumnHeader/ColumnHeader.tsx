import React, { useRef } from 'react';
import './ColumnHeader.scss';
import { removeColumn } from 'slices/columnSlice';
import { useAppDispatch } from 'store/hooks';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

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
      <div className="column-header__content" onClick={onEditName}>
        {isEditing ? (
          <TextField
            defaultValue={name}
            ref={inputRef}
            variant="outlined"
            onChange={onNameChange}
            onBlur={onSaveName}
            onKeyUp={onKeyUp}
            autoFocus
            sx={{
              width: '220px',
              bgcolor: '#fff',
              '.MuiInputBase-input': {
                height: '20px',
                boxSizing: 'border-box',
              },
            }}
          />
        ) : (
          <div className="column-header__content">
            <h3 className="column-header__title">
              {name}
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
        )}
      </div>
    </div>
  );
}

