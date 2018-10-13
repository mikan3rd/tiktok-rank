import {createAction} from 'redux-actions';

const getUserResult = createAction('Index/getUserResult');
const changeValueForKey = createAction('Index/changeValueForKey');
const sendStripeToken = createAction('Index/sendStripeToken');

export default {
  getUserResult,
  changeValueForKey,
  sendStripeToken,
};
