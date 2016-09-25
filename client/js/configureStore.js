import {createStore, combineReducers} from 'redux';

import form from './reducers/form';
import upload from './reducers/upload';

const addLoggingToDispatch = (store) => {
  /* eslint-disable no-console */
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
  /* eslint-enable no-console */
};

export default () => {
  const reducer = combineReducers({
    form,
    upload,
    screen
  });
  const store = createStore(
    reducer
  );

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  return store;
}
