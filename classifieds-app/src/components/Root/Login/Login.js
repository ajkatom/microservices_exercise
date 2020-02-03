import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Textinput from '#root/components/Root/sharedComponents/Textinput';
import { setSession } from '../../../../redux/ducks/session';

const Label = styled.label`
  display: block;

  :not(:first-child) {
    margin-top: 0.75rem;
  }
`;

const LabelText = styled.strong`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const LoginButton = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
`;
const SignUpButton = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
`;

const mutation = gql`
  mutation($email: String!, $password: String!) {
    createUserSession(email: $email, password: $password) {
      id
      user {
        id
        email
      }
    }
  }
`;

const Login = ({ onChangeToSignUp: pushChangeToSignUp }) => {
  const dispatch = useDispatch();
  const [createUserSession] = useMutation(mutation);
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const {
      data: { createUserSession: newSession },
    } = await createUserSession({
      variables: {
        email,
        password,
      },
    });
    dispatch(setSession(newSession));
  });
  return (
    <form onSubmit={onSubmit}>
      <Label>
        <LabelText>Email</LabelText>
        <Textinput disabled={isSubmitting} name="email" type="email" ref={register} />
      </Label>
      <Label>
        <LabelText>Password</LabelText>
        <Textinput disabled={isSubmitting} name="password" type="password" ref={register} />
      </Label>
      <LoginButton disabled={isSubmitting} type="submit">
        Login
      </LoginButton>
      <SignUpButton
        href="#"
        onClick={e => {
          e.preventDefault();
          pushChangeToSignUp();
        }}
      >
        Sign Up
      </SignUpButton>
    </form>
  );
};

export default Login;
