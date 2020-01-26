import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useDispatch } from 'react-redux';

import graphqlClient from '#root/api/graphqlClient';
import { setSession } from '../../../redux/ducks/session';
import AccountDetails from './AccountDetails/AccountDetails';

const query = gql`
  {
    userSession(me: true) {
      id
      user {
        id
        email
      }
    }
  }
`;

const Content = styled.div`
  flex: 1;
  margin-right: 1rem;
`;
const Sidebar = styled.div`
  flex: 0 auto;
  width: 10rem;
`;

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  width: 80rem;
`;
const Wraper = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 1rem;
  width: 100%;
`;

const Root = () => {
  const dispatch = useDispatch();
  const [initialised, setInitialised] = useState(false);
  useEffect(() => {
    graphqlClient.query({ query }).then(({ data }) => {
      if (data.userSession) {
        dispatch(setSession(data.userSession));
        setInitialised(true);
      }
    });
  }, []);
  if (!initialised) return 'loading....';
  return (
    <Wraper>
      <Container>
        <Content>heart beat</Content>
        <Sidebar>
          <AccountDetails />
        </Sidebar>
      </Container>
    </Wraper>
  );
};
export default Root;
