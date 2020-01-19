import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';

import TextIntput from '#root/components/Root/sharedComponents/TextInput';

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

const mutation = gql`
  mutation createUserSession($email: String!, $password: String!) {
    createUserSession(input: { email: $email, passowrd: $password }) {
      id
      user {
        id
        email
      }
    }
  }
`;

const Login = () => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = handleSubmit(({ email, password }) => {
    console.log(email, password);
  });
  return (
    <form onSubmit={onSubmit}>
      <Label>
        <LabelText>Email</LabelText>
        <TextIntput disabled={isSubmitting} name="email" type="email" ref={register} />
      </Label>
      <Label>
        <LabelText>Password</LabelText>
        <TextIntput disabled={isSubmitting} name="password" type="password" ref={register} />
      </Label>
      <LoginButton disabled={isSubmitting} type="submit">
        Login
      </LoginButton>
    </form>
  );
};

export default Login;
