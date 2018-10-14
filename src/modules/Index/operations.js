// @flow
import {put, takeLatest, call} from 'redux-saga/effects';

import Actions from './actions';
import {ChargeApi, TikTokApi} from '../../helpers/api';

export default function* (): Generator<*, *, *> {
  yield takeLatest(Actions.getUserResult, getUserResult);
  yield takeLatest(Actions.sendStripeToken, sendStripeToken);
}

function* getUserResult(action) : Generator<*, *, *> {

  yield put(Actions.changeValueForKey({key: 'isLoading', value: true}));

  const params = action.payload;
  const response = yield call(TikTokApi.getUserList, params);
  // console.log(response)

  if (response.status === 200) {
    yield put(Actions.changeValueForKey({key: 'userResult', value: response.data}));

  }
  yield put(Actions.changeValueForKey({key: 'isLoading', value: false}));
}


function* sendStripeToken(action) : Generator<*, *, *> {
  yield put(Actions.changeValueForKey({key: 'isLoading', value: true}));
  const token = action.payload;
  yield call(ChargeApi.post, token);
  yield put(Actions.changeValueForKey({key: 'isLoading', value: false}));
}
