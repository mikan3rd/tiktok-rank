import {handleActions} from 'redux-actions';
import {Record, Map} from 'immutable';

import Actions from './actions';


let storage = Map({
  clickCount: 0,
  count: 0,
  totalCount: 0,
  time: null,
  storeList: [],
});

const mcStorageJson = localStorage.getItem('mcStorage');
if (mcStorageJson) {
  const mcStorage = Map(JSON.parse(mcStorageJson));
  storage = storage.merge(mcStorage);
}


const IndexRecord = Record({
  storage,
  isLoading: false,
  isProgress: false,
  message: '',
  isSideOpen: false,
  isOpenModal: false,
  isToast: false,
});

class Index extends IndexRecord {
}


export default handleActions({
  [Actions.changeValueForKey]: (state, action) => {
    const {key, value} = action.payload;
    return state.set(key, value);
  },
  [Actions.changeValueOfStorage]: (state, action) => {
    const {key, value} = action.payload;
    return state.setIn(['storage', key], value);
  },
  [Actions.buyStore]: (state, action) => {
    const {storeList, cost} = action.payload;
    let newState = state.setIn(['storage', 'storeList'], storeList);
    newState = state.updateIn(['storage', 'count'], count => count - cost);
    return newState;
  },
}, new Index());
