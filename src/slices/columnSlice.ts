import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { CardTypes } from 'types/CardTypes';
import { ColumnTypes } from 'types/ColumnTypes';

type ColumnsState = ColumnTypes[];

const initialState: ColumnsState = [];

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumn: (state: ColumnsState, action: PayloadAction<ColumnTypes>) => {
      state.push(action.payload);
    },
    removeColumn: (state: ColumnsState, action: PayloadAction<number>) => {
      state = state.filter(column => column.id !== action.payload);
    },
    renameColumn: (state: ColumnsState, action: PayloadAction<{ id: number, newName: string }>) => {
      const column = state.find(column => column.id === action.payload.id);
      if (column) {
        column.name = action.payload.newName;
      }
    },
    addCard: (state: ColumnsState, action: PayloadAction<{ id: number, card: CardTypes }>) => {
      const column = state.find(column => column.id === action.payload.id);
      if (column) {
        column.cards.push(action.payload.card);
      }
    },
    renameCard: (state: ColumnsState, action: PayloadAction<{
      columnId: number,
      cardId: number,
      newName: string,
    }>) => {
      const column = state.find(column => column.id === action.payload.columnId);
      if (column) {
        const card = column.cards.find(card => card.id === action.payload.cardId);
        if (card) {
          card.name = action.payload.newName;
        }
      }
    },
    updateCard: (state: ColumnsState, action: PayloadAction<CardTypes>) => {
      const { id } = action.payload;
      for (let column of state) {
        const cardIndex = column.cards.findIndex(card => card.id === id);
        if (cardIndex > -1) {
          column.cards[cardIndex] = action.payload;
          return;
        }
      }
    },
    removeCard: (state: ColumnsState, action: PayloadAction<{
      columnId: number,
      cardId: number,
    }>) => {
      const column = state.find(column => column.id === action.payload.columnId);
      if (column) {
        column.cards = column.cards.filter(card => card.id !== action.payload.cardId);
      }
    },
    moveCard: (state: ColumnsState, action: PayloadAction<{
      cardId: number,
      fromColumnId: number,
      toColumnId: number,
      targetIndex?: number,
    }>) => {
      const { cardId, fromColumnId, toColumnId, targetIndex } = action.payload;

      const fromColumn = state.find(column => column.id === fromColumnId);
      const toColumn = state.find(column => column.id === toColumnId);

      if (!fromColumn || !toColumn) return;

      const cardToMove = fromColumn.cards.find(card => card.id === cardId);

      if (!cardToMove) return;

      fromColumn.cards = fromColumn.cards.filter(card => card.id !== cardId);
      if (typeof targetIndex !== 'undefined') {
        toColumn.cards.splice(targetIndex, 0, cardToMove);
      } else {
        toColumn.cards.push(cardToMove);
      }
    },
  },
});

export const {
  addColumn,
  removeColumn,
  renameColumn,
  addCard,
  renameCard,
  updateCard,
  removeCard,
  moveCard,
} = columnsSlice.actions;

export const selectColumns = (state: RootState) => state.columns;
