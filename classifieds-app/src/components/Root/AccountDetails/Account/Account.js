import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Warpper = styled.div`
  color: ${props => props.theme.mortar};
  font-size: 0.9rem;
`;
const Email = styled.div`
  color: ${props => props.theme.nero};
  font-size: 1rem;
  margin-top: 0.25rem;
`;

const Account = () => {
  const session = useSelector(state => state.session);

  return (
    <Warpper>
      Logged in as:
      <Email>{session.user.email}</Email>
    </Warpper>
  );
};

export default Account;
