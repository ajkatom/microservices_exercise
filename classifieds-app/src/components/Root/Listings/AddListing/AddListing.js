import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Textinput from '#root/components/Root/sharedComponents/Textinput';
import Textarea from '#root/components/Root/sharedComponents/Textarea';

const ListButton = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
`;

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

const Form = styled.form`
  background-color: ${props => props.theme.whiteSmoke};
  margin-top: 1rem;
  padding: 1rem;
`;

const mutation = gql`
  mutation($description: String!, $title: String!) {
    createListing(description: $description, title: $title) {
      id
    }
  }
`;

const AddListing = ({ onAddListing: pushAddListing }) => {
  const [createListing] = useMutation(mutation);
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async ({ description, title }) => {
    createListing({ variables: { description, title } });
    reset();
    pushAddListing();
  });
  const session = useSelector(state => state.session);
  if (!session) return <span>Login to add listings </span>;
  return (
    <Form onSubmit={onSubmit}>
      <Label>
        <LabelText>Title</LabelText>
        <Textinput disabled={isSubmitting} name="title" type="text" ref={register} />
      </Label>
      <Label>
        <LabelText>Description</LabelText>
        <Textarea disabled={isSubmitting} name="description" ref={register} />
      </Label>
      <ListButton disabled={isSubmitting} type="submit">
        LIST
      </ListButton>
    </Form>
  );
};

export default AddListing;
