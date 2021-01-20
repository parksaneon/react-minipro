import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import userInfo, { userSaga } from './user';
import { connectRouter } from 'connected-react-router';
import signinfo, { signupSaga } from './userSign';
import newRoutine, { routineSaga } from './newRoutine';
import { reducer as formReducer } from 'redux-form';
import getRoutine, { watchGetRoutine } from './getRoutine';
export const rootReducer = history =>
  combineReducers({
    userInfo,
    signinfo,
    newRoutine,
    getRoutine,
    router: connectRouter(history),
    form: formReducer,
  });

export function* rootSaga() {
  yield all([userSaga(), signupSaga(), routineSaga(), watchGetRoutine()]);
}
