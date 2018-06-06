import {createAction} from 'redux-actions';

const getSearchResult = createAction('Index/getSearchResult');
const getFoodCategory = createAction('Index/getFoodCategory');
const getFood = createAction('Index/getFood');
const changeValueForKey = createAction('Index/changeValueForKey');
const changeValueOfParams = createAction('Index/changeValueOfParams');
const sendStripeToken = createAction('Index/sendStripeToken');

export default {
  getSearchResult,
  getFoodCategory,
  getFood,
  changeValueForKey,
  changeValueOfParams,
  sendStripeToken,
};
