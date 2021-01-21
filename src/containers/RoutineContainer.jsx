import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routine from '../components/Routine';
import { getEdit, getRemove, getStart } from '../modules/getRoutine';
import { logoutStart } from '../modules/logout';
import { newRemove } from '../modules/newRoutine';
import { loginremove } from '../modules/user';
import { signupRemove } from '../modules/userSign';
const RoutineContainer = () => {
  const dispatch = useDispatch();
  const routines = useSelector(state => state.getRoutine);
  const getRoutine = () => dispatch(getStart());
  const removeRoutine = id => dispatch(getRemove(id));
  const editRoutine = (id, routine) => dispatch(getEdit(id, routine));
  const onLogout = () => {
    dispatch(newRemove());
    dispatch(getRemove());
    dispatch(loginremove());
    dispatch(signupRemove());
    dispatch(logoutStart());
  };

  return (
    <Routine
      routines={routines}
      onLogout={onLogout}
      getRoutine={getRoutine}
      removeRoutine={removeRoutine}
      editRoutine={editRoutine}
    />
  );
};

export default RoutineContainer;
