import { configureStore } from '@reduxjs/toolkit';
import { columnsSlice } from '../slices/columnSlice';

const store = configureStore({
  reducer: {
    columns: columnsSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
