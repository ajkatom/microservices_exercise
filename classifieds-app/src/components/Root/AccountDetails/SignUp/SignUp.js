import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import * as yup from 'yup';

import Textinput from '#root/components/Root/sharedComponents/Textinput';
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

const SignUpButton = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
`;
const LoginButton = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
`;

const mutation = gql`
  mutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
    }
  }
`;

const validationSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup
    .string()
    .required()
    .test('identicalPasswords', 'passwords are not identical to ', function() {
      return this.parent.password === this.parent.confirmPassword;
    }),
});

const SignUp = ({ onChangeToLogin: pushChangeToLogin }) => {
  const [createUser] = useMutation(mutation);
  const {
    formState: { isSubmitting, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm({ mode: 'onChange', validationSchema });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await createUser({ variables: { email, password } });
    reset();
    pushChangeToLogin();
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
      <Label>
        <LabelText>Confrim Password</LabelText>
        <Textinput disabled={isSubmitting} name="confirmPassword" type="password" ref={register} />
      </Label>
      <SignUpButton disabled={isSubmitting || !isValid} type="submit">
        Sign Up
      </SignUpButton>
      <LoginButton
        href="#"
        onClick={e => {
          e.preventDefault();
          pushChangeToLogin();
        }}
      >
        Login
      </LoginButton>
    </form>
  );
};

export default SignUp;
