import React from 'react';
import './ColumnInput.scss';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

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
      <TextField
        onKeyUp={onKeyUp}
        defaultValue={columnName}
        onChange={onColumnNameChange}
        id="outlined-basic"
        variant="outlined"
        placeholder='Enter the title of the list'
        autoFocus
        sx={{
          width: '250px',
          bgcolor: '#fff',
          marginBottom: '12px',
          '.MuiInputBase-input': {
            height: '20px',
            boxSizing: 'border-box',
          },
        }}
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
