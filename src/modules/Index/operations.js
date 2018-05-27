// @flow
import {put, takeLatest, call} from 'redux-saga/effects';

import Actions from './actions';
import {ChargeApi, HotpepperApi} from '../../helpers/api';
import ShopListPage from '../../components/ShopListPage';

export default function* (): Generator<*, *, *> {
  yield takeLatest(Actions.getSearchResult, getSearchResult);
  yield takeLatest(Actions.sendStripeToken, sendStripeToken);
}

function* getSearchResult(action) : Generator<*, *, *> {
  yield put(Actions.changeValueForKey({key: 'message', value: 'お店を検索中...'}));
  yield put(Actions.changeValueForKey({key: 'isLoading', value: true}));
  const {params, navigator} = action.payload;
  console.log("params:", params);
  const response = yield call(HotpepperApi.get, params);
  console.log(response);
  if (response.status === 200) {
    yield put(Actions.changeValueForKey({key: 'searchResult', value: response.data.results}));
    navigator.pushPage({component: ShopListPage, key: 'ShopListPage'});
  }
  yield put(Actions.changeValueForKey({key: 'isLoading', value: false}));
}

function* sendStripeToken(action) : Generator<*, *, *> {
  yield put(Actions.changeValueForKey({key: 'isLoading', value: true}));
  const token = action.payload;
  console.log("token:", token);
  const response = yield call(ChargeApi.post, token);
  console.log("response:", response);
  yield put(Actions.changeValueForKey({key: 'isLoading', value: false}));
}
