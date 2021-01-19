import React from 'react';
import { useDispatch } from 'react-redux';
import Signup from '../components/Signup';
import { signupStart } from '../modules/signup';

const SignupContainer = () => {
  const dispatch = useDispatch();
  const onSignup = payload => dispatch(signupStart(payload));

  return <Signup onSignup={onSignup} />;
};

export default SignupContainer;
