// @flow
import {put, takeLatest, call} from 'redux-saga/effects';

import Actions from './actions';
import {ChargeApi, HotpepperApi} from '../../helpers/api';

export default function* (): Generator<*, *, *> {
  yield takeLatest(Actions.getSearchResult, getSearchResult);
  yield takeLatest(Actions.sendStripeToken, sendStripeToken);
}

function* getSearchResult(action) : Generator<*, *, *> {
  const {params, navigator} = action.payload;

  if (navigator) {
    yield put(Actions.changeValueForKey({key: 'message', value: 'お店を検索中...'}));
  } else {
    yield put(Actions.changeValueForKey({key: 'isProgress', value: true}));
  }

  const response = yield call(HotpepperApi.get, params);

  if (response.status === 200) {
    yield put(Actions.changeValueForKey({key: 'searchResult', value: response.data.results}));
    yield put(Actions.changeValueForKey({key: 'isProgress', value: false}));

  }
  yield put(Actions.changeValueForKey({key: 'isLoading', value: false}));
}


function* sendStripeToken(action) : Generator<*, *, *> {
  yield put(Actions.changeValueForKey({key: 'isLoading', value: true}));
  const token = action.payload;
  const response = yield call(ChargeApi.post, token);
  yield put(Actions.changeValueForKey({key: 'isLoading', value: false}));
}
