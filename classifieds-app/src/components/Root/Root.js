import React from 'react';
import styled from 'styled-components';
import Login from './Login/index';

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
  return (
    <Wraper>
      <Container>
        <Content>heart beat</Content>
        <Sidebar>
          <Login />
        </Sidebar>
      </Container>
    </Wraper>
  );
};
export default Root;
