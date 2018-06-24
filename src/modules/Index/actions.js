import {createAction} from 'redux-actions';

const getSearchResult = createAction('Index/getSearchResult');
const changeValueForKey = createAction('Index/changeValueForKey');
const changeValueOfStorage = createAction('Index/changeValueOfStorage');
const buyStore = createAction('Index/buyStore');
const sendStripeToken = createAction('Index/sendStripeToken');

export default {
  getSearchResult,
  changeValueForKey,
  changeValueOfStorage,
  buyStore,
  sendStripeToken,
};
