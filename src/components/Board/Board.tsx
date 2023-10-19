import { ColumnTypes } from '../../types/ColumnTypes';
import './Board.scss';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addColumn } from '../../slices/columnSlice';
import { ColumnList } from '../ColumnList/ColumnList';
import { ColumnInput } from '../ColumnInput/ColumnInput';

export const Board: React.FC = () => {
  const [newColumnName, setNewColumnName] = useState('');
  const [isInputVisible, setInputVisible] = useState(false);
  const columns = useAppSelector(state => state.columns.columns);
  const dispatch = useAppDispatch();

  const handleAddColumn = () => {
    if (newColumnName.trim() === '') {
      return;
    }

    const newColumn: ColumnTypes = {
      id: Date.now(),
      name: newColumnName,
      cards: []
    };

    dispatch(addColumn(newColumn));
    setNewColumnName('');
    setInputVisible(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleAddColumn()
    }
  };

  const handleColumnName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddColumn();
  };

  const handleCloseButton = () => {
    setInputVisible(false);
    setNewColumnName('');
  };

  const handleInputVisible = () => {
    setInputVisible(!isInputVisible)
  };

  return (
    <section className="board">
      <h1 className="board__title">
        Simple Trello
      </h1>
      <div className="board__content">
        <ColumnList columns={columns} />

        <ColumnInput
          isVisible={isInputVisible}
          columnName={newColumnName}
          onColumnNameChange={handleColumnName}
          onKeyUp={handleKeyUp}
          onSubmit={handleSubmit}
          onClose={handleCloseButton}
          onInputVisible={handleInputVisible}
        />
      </div>
    </section>
  );
};
