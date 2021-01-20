import { createAction, handleActions } from 'redux-actions';
import axios from '../../node_modules/axios/index';
import { push } from 'connected-react-router';
import { call, put, takeEvery } from 'redux-saga/effects';
import { newStart } from './newRoutine';

const GETSTART = 'getRoutine/START';
const GETSUCCESS = 'getRoutine/SUCCESS';
const GETFAIL = 'getRoutine/FAIL';

export const getStart = createAction(GETSTART);
const getSuccess = createAction(GETSUCCESS, routines => routines);
const getfail = createAction(GETFAIL);

// 리듀서함수제작

const getRoutine = handleActions(
  {
    [GETSTART]: state => state,
    [GETSUCCESS]: (state, { payload }) => [...state, ...payload],
    [GETFAIL]: state => ({ ...state }),
  },
  [],
);

export default getRoutine;

function* getRoutineSaga({ payload }) {
  try {
    const { id } = JSON.parse(localStorage.getItem('token'));
    const res = yield call(axios.get, `/users/${id}`);
    yield put(getSuccess(res.data.routines));
  } catch (error) {
    console.log(error);
    yield put(getfail(error));
  }
}

export function* watchGetRoutine() {
  yield takeEvery(GETSTART, getRoutineSaga);
}
