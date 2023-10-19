import React from 'react';
import { Provider } from 'react-redux';
import { Board } from './components/Board/Board';
import './App.scss';
import store from './app/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
