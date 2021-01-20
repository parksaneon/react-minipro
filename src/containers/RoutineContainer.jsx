import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routine from '../components/Routine';
import { getStart } from '../modules/getRoutine';

const RoutineContainer = () => {
  const dispatch = useDispatch();

  const getRoutines = useCallback(async () => {
    dispatch(getStart());
  }, [dispatch]);

  const routines = useSelector(state => state.getRoutine);

  return <Routine routines={routines} getRoutines={getRoutines} />;
};

export default RoutineContainer;
