import { combineReducers } from 'redux';
import userinfo, { userSaga } from '../modules/user';
import { all } from 'redux-saga/effects';
import { connectRouter } from 'connected-react-router';

export const reducer = history =>
  combineReducers({
    userinfo,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([userSaga()]);
}
