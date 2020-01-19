import { render } from 'react-dom';
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';

import Root from '#root/components/Root';
import * as theme from './theme';
import graphqlClient from '#root/api/graphqlClient';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Gelasio:400,700&display=swap');

html, body ,#app{
  height: 100%;
  margin: 0;
  padding:0;
  width: 100%;
}
body{
  font-family: Gelasio, sans-serif;
}
`;

render(
  <ApolloProvider client={graphqlClient}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Root />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('app')
);
