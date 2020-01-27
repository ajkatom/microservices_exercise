import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { clearSession } from '../../../../../redux/ducks/session';

const Warpper = styled.div`
  color: ${props => props.theme.mortar};
  font-size: 0.9rem;
`;
const Email = styled.div`
  color: ${props => props.theme.nero};
  font-size: 1rem;
  margin-top: 0.25rem;
`;
const LogoutLink = styled.a.attrs({ href: '#' })`
  color: blue;
  display: block;
  margin-top: 0.25rem;
`;

const mutation = gql`
  mutation($sessionId: ID!) {
    deleteUserSession(sessionId: $sessionId)
  }
`;

const Account = () => {
  const [deleteUserSession] = useMutation(mutation);
  const session = useSelector(state => state.session);

  const dispatch = useDispatch();

  return (
    <Warpper>
      Logged in as:
      <Email>{session.user.email}</Email>
      <LogoutLink
        onClick={e => {
          e.preventDefault();
          dispatch(clearSession());
          deleteUserSession({ variables: { sessionId: session.id } });
        }}
      >
        Logout
      </LogoutLink>
    </Warpper>
  );
};

export default Account;
