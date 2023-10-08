// Реализация стора
const createStore = (reducer) => {
  let state = reducer(undefined, { type: '__INIT' });
  let subscribers = [];
  return {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action);
      subscribers.forEach((callback) => callback());
    },
    subsribe: (callback) => subscribers.push(callback),
  };
};
const ACTIONS = {
  ADD_EVENT: 'ADD_EVENT',
  REMOVE_EVENT: 'REMOVE_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  SORT_EVENT: 'SORT_EVENT',
  SUCCESS_LOGIN: 'SUCCESS_LOGIN',
};
// actionCreator
const actionCreaterAddEvent = (eventInfo) => {
  // const eventInfoFull = fetch('запрос на получение данных')
  // prepare
  const eventInfoFull = eventInfo;
  return {
    type: ACTIONS.ADD_EVENT,
    payload: eventInfoFull,
  };
};

const actionCreaterRemoveEvent = (eventNum) => {
  return {
    type: ACTIONS.REMOVE_EVENT,
    payload: eventNum,
  };
};

const actionCreaterUpdateEvent = (eventNum, eventInfo) => {
  return {
    type: ACTIONS.UPDATE_EVENT,
    payload: [eventNum, eventInfo],
  };
};

const actionCreaterSortEvent = (directionAsc = true) => {
  return {
    type: ACTIONS.SORT_EVENT,
    payload: directionAsc,
  };
};

const initialStateEvents = {
  eventsWorld: ['Событие 1'],
};
// reducer - чистая функция
// 1. не должно быть side - эффектов, т.е. асинхронные запросы
// 2. при передачи одних и тех же данных при вызове редюсера получаем один и тот же результат
// immutable
const reducerEvents = (state = initialStateEvents, action) => {
  switch (action.type) {
    case ACTIONS.ADD_EVENT:
      const newState = {
        ...state,
        // сделал короче
        eventsWorld: [...state.eventsWorld, action.payload.text],
      };
      return newState;
    case ACTIONS.REMOVE_EVENT:
      return {
        ...state,
        // array.filter создает новый массив
        eventsWorld: state.eventsWorld.filter((v, i) => i !== action.payload),
      };
    case ACTIONS.UPDATE_EVENT:
      const [ai, av] = action.payload;
      return {
        ...state,
        // array.map создает новый массив
        eventsWorld: state.eventsWorld.map((v, i) => (i === ai ? av : v)),
      };
    case ACTIONS.SORT_EVENT:
      return {
        ...state,
        // array.sort сортирует на месте, надо создать новый массив
        eventsWorld: [...state.eventsWorld].sort((a, b) =>
          action.payload ? a.localeCompare(b) : b.localeCompare(a)
        ),
      };
    default:
      return {
        ...state,
      };
  }
};
const initialStateUsers = {
  users: ['Пользователь 1'],
};
const reducerLogin = (state = initialStateUsers, action) => {
  switch (action.type) {
    case ACTIONS.SUCCESS_LOGIN:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
const combineReducers = (reducersMap) => {
  return (state, action) => {
    const nextState = {};
    Object.entries(reducersMap).forEach(([key, reducer]) => {
      nextState[key] = reducer(state ? state[key] : state, action);
    });
    return nextState;
  };
};
const rootReducer = combineReducers({
  reducerEventsState: reducerEvents,
  reducerUsersState: reducerLogin,
});
const store = createStore(rootReducer);
store.subsribe(() => console.log('Изменились события...'));
console.log('store до', store.getState());
store.dispatch({ type: 'ADD_EVENT', payload: { text: 'Событие 2' } });
store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { text: 'Событие 3' } });
store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { text: 'Событие 4' } });
store.dispatch(actionCreaterAddEvent({ text: 'Событие 88' }));
console.log('store после', store.getState());

store.dispatch(actionCreaterRemoveEvent(2));
console.log('store после remove', store.getState());

store.dispatch(actionCreaterUpdateEvent(2, 'Событие 33'));
console.log('store после update', store.getState());

store.dispatch(actionCreaterSortEvent(false));
console.log('store после sort по убыванию', store.getState());

store.dispatch(actionCreaterSortEvent());
console.log('store после sort по возрастанию', store.getState());
