import axios from 'axios';
import { push } from 'connected-react-router';
import { createAction, createActions, handleActions } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';
// const prefix = 'progeser/user';

// type
const SIGNUPSTART = 'signup/START';
const SIGNUPUCCESS = 'signup/SUCCESS';
const SIGNUPFAIL = 'signup/FAIL';

// 액션 생성 함수
export const signupStart = createAction(SIGNUPSTART, userData => userData);
const signinSuccess = createAction(SIGNUPUCCESS, userData => userData);
const signinFail = createAction(SIGNUPFAIL);

// 리듀서
const userinfo = handleActions(
  {
    [SIGNUPSTART]: state => ({ ...state }),
    [SIGNUPUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [SIGNUPFAIL]: state => ({ ...state }),
  },
  {},
);

export default userinfo;

function* signinSaga({ payload }) {
  try {
    const loginUser = yield call(axios.post, `/users/`, { payload });
    yield put(signinSuccess(payload));
    localStorage.setItem('token', JSON.stringify(loginUser.data));
    yield put(push('/'));
    console.log(localStorage.getItem('token'));
  } catch (error) {
    yield put(signinFail());
  }
}

export function* signsaga() {
  yield takeEvery(SIGNUPSTART, signinSaga);
}
