import {createAction} from 'redux-actions';

const getSearchResult = createAction('Index/getSearchResult');
const getFoodCategory = createAction('Index/getFoodCategory');
const getFood = createAction('Index/getFood');
const changeValueForKey = createAction('Index/changeValueForKey');
const chnageValueOfStorage = createAction('Index/chnageValueOfStorage');
const sendStripeToken = createAction('Index/sendStripeToken');

export default {
  getSearchResult,
  getFoodCategory,
  getFood,
  changeValueForKey,
  chnageValueOfStorage,
  sendStripeToken,
};
