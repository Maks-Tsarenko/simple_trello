import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import store from './store/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board } from 'components/Board/Board';

export const App: React.FC = () => {
  return (
    <section className="app">
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <Board />
        </Provider>
      </DndProvider>
    </section>
  );
}
