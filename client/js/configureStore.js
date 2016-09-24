import {createStore, combineReducers} from 'redux';
import throttle from 'lodash/throttle';

import dummy from './reducers/dummy';
import {loadState, saveState} from './localStorage';

export default () => {
  const persistedState = {}; //loadState();
  const reducer = combineReducers({
    dummy
  });
  const store = createStore(
    reducer,
    persistedState
  );

  store.subscribe(throttle(() => {
    saveState({
      dummy: store.getState().dummy
    });
  }, 1000));

  return store;
}
