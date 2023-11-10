import React from 'react';
import './ColumnInput.scss';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

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
        <Button
          variant="contained"
          type="submit"
          size='small'
          sx={{
            height: '32px',
            marginRight: '16px',
          }}
        >
          Add column
        </Button>

        <Button
          onClick={onClose}
          variant="contained"
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
    </form>
  ) : (
    <div className="column-input__add">
      <Button
        variant="contained"
        type="submit"
        onClick={onInputVisible}

        sx={{
          justifyContent: 'flex-start',
          bgcolor: '#eaecec',
          width: '100%',
          ':hover': { bgcolor: '#d5d8db' },
          color: '#333',
        }}
        startIcon={<AddIcon />}
      >
        Add Column
      </Button>
    </div>
  );
};
