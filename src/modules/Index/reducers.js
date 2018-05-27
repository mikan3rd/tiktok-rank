import {handleActions} from 'redux-actions';
import {Record, Map} from 'immutable';

import Actions from './actions';


let params = Map({
  query: '',
  latitude: null,
  longitude: null,
});
const searchParamsJson = localStorage.getItem('searchParams');
if (searchParamsJson) {
  params = Map(JSON.parse(searchParamsJson));
}


const IndexRecord = Record({
  params,
  searchResult: null,
  isLoading: false,
  message: '',
  isSideOpen: false,
  isOpenModal: null,
  naviShop: null,
});

class Index extends IndexRecord {
}


export default handleActions({
  [Actions.changeValueForKey]: (state, action) => {
    const {key, value} = action.payload;
    return state.set(key, value);
  },
  [Actions.changeValueOfParams]: (state, action) => {
    const {key, value} = action.payload;
    return state.setIn(['params', key], value);
  },
}, new Index());
