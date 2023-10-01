import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store, ActionTypes } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const onChangeHandler = (e: { target: { value: string } }) =>
  store.dispatch({
    type: ActionTypes.SET_NAME_ACTION,
    pyload: e.target.value,
  });

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div>
        <input type='text' onChange={onChangeHandler} />
        <button
          onClick={() =>
            store.dispatch({ type: ActionTypes.CLEAR_NAME_ACTION })
          }
        >
          Очистить текст
        </button>
      </div>
      <div>
        <button
          onClick={() =>
            store.dispatch({ type: ActionTypes.INCREMENT_NUM_ACTION })
          }
        >
          +1
        </button>
        <button
          onClick={() =>
            store.dispatch({
              type: ActionTypes.INCREMENT_NUM_ACTION,
              pyload: 2,
            })
          }
        >
          +2
        </button>
        <button
          onClick={() =>
            store.dispatch({ type: ActionTypes.DECRIMENT_NUM_ACTION })
          }
        >
          -1
        </button>
        <button
          onClick={() =>
            store.dispatch({
              type: ActionTypes.DECRIMENT_NUM_ACTION,
              pyload: 2,
            })
          }
        >
          +2
        </button>
        <button
          onClick={() =>
            store.dispatch({
              type: ActionTypes.SET_NUM_ACTION,
            })
          }
        >
          =0
        </button>
        <button
          onClick={() =>
            store.dispatch({
              type: ActionTypes.SET_NUM_ACTION,
              pyload: 5,
            })
          }
        >
          =5
        </button>
      </div>
    </Provider>
  </React.StrictMode>
);
