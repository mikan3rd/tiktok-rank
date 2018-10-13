import {handleActions} from 'redux-actions';
import {Record, Map, List} from 'immutable';

import Actions from './actions';


const IndexRecord = Record({
  isLoading: true,
  userResult: {
    userList: [],
    paging: {},
  },
});

class Index extends IndexRecord {
}


export default handleActions({
  [Actions.changeValueForKey]: (state, action) => {
    const {key, value} = action.payload;
    return state.set(key, value);
  },
}, new Index());
