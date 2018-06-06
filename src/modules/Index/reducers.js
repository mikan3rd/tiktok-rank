import {handleActions} from 'redux-actions';
import {Record, Map} from 'immutable';

import Actions from './actions';


let params = Map({
  latitude: null,
  longitude: null,
  lunch: 1,
  range: "3",
  food: null,
  wifi: 0,
});
// const searchParamsJson = localStorage.getItem('searchParams');
// if (searchParamsJson) {
//   params = Map(JSON.parse(searchParamsJson));
// }


const IndexRecord = Record({
  params,
  searchResult: null,
  isLoading: false,
  message: '',
  isSideOpen: false,
  isOpenModal: null,
  naviShop: null,
  foodCategory: [],
  selectedCategory: null,
  food: [],
});

class Index extends IndexRecord {
}


export default handleActions({
  [Actions.changeValueForKey]: (state, action) => {
    const {key, value} = action.payload;
    if (key == 'message') {
      return state.merge({
        [key]: value,
        'isLoading': true,
      })
    }

    return state.set(key, value);
  },
  [Actions.changeValueOfParams]: (state, action) => {
    const {key, value} = action.payload;
    return state.setIn(['params', key], value);
  },
}, new Index());
