import { createAction, handleActions } from 'redux-actions';
import axios from '../../node_modules/axios/index';
import { push } from 'connected-react-router';
import { call, put, takeEvery, select } from 'redux-saga/effects';

const GETSTART = 'getRoutine/START';
const GETSUCCESS = 'getRoutine/SUCCESS';
const GETFAIL = 'getRoutine/FAIL';
const GETREMOVE = 'getRoutine/REMOVE';
const GETEDIT = 'getRoutine/EDIT';

export const getStart = createAction(GETSTART);
const getSuccess = createAction(GETSUCCESS, routine => routine);
const getfail = createAction(GETFAIL);
export const getRemove = createAction(GETREMOVE, id => ({ id }));
export const getEdit = createAction(GETEDIT, (id, routine) => ({
  id,
  routine,
}));
// 리듀서함수제작

const getRoutine = handleActions(
  {
    [GETSTART]: state => state,
    [GETSUCCESS]: (state, { payload }) => payload,
    [GETFAIL]: state => state,
    [GETREMOVE]: state => state,
    [GETEDIT]: state => state,
  },
  [],
);

export default getRoutine;

function* getRoutineSaga() {
  try {
    const { id } = JSON.parse(localStorage.getItem('token'));
    const res = yield call(axios.get, `/users/${id}`);
    yield put(getSuccess(res.data.routines));
  } catch (error) {
    console.log(error);
    yield put(getfail(error));
  }
}

function* removeRoutineSaga({ payload: { id: routineId } }) {
  try {
    const { id } = JSON.parse(localStorage.getItem('token'));
    const prevState = yield select(state => state.getRoutine);
    const newRoutines = prevState.filter(routine => {
      console.log(routine.id, routineId);
      if (routine.id !== routineId) return true;
    });
    yield call(axios.patch, `/users/${id}`, { routines: newRoutines });
    yield put(getSuccess(newRoutines));
  } catch (error) {
    console.log(error);
    yield put(getfail(error));
  }
}

function* editRoutineSaga({ payload: { id: routineId, routine: routineText } }) {
  try {
    const { id } = JSON.parse(localStorage.getItem('token'));
    const prevState = yield select(state => state.getRoutine);
    const newRoutines = prevState.map(routine => {
      if (routine.id === routineId) {
        return { ...routine, routine: routineText };
      }
      return routine;
    });
    yield call(axios.patch, `/users/${id}`, { routines: newRoutines });
    yield put(getSuccess(newRoutines));
  } catch (error) {
    console.log(error);
    yield put(getfail(error));
  }
}

export function* watchGetRoutineSaga() {
  yield takeEvery(GETSTART, getRoutineSaga);
}
export function* watchRemoveRoutineSaga() {
  yield takeEvery(GETREMOVE, removeRoutineSaga);
}
export function* watchEditRoutineSaga() {
  yield takeEvery(GETEDIT, editRoutineSaga);
}
