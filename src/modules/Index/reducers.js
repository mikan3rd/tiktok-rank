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
  storage = Map(JSON.parse(mcStorageJson));
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
    if (key === 'message') {
      return state.merge({
        [key]: value,
        'isLoading': true,
      })
    }

    return state.set(key, value);
  },
  [Actions.chnageValueOfStorage]: (state, action) => {
    const {key, value} = action.payload;
    return state.setIn(['storage', key], value);
  },
}, new Index());
