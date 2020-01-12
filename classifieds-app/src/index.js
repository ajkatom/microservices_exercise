import { render } from 'react-dom';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import Root from '#root/components/Root';

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
  <>
    <GlobalStyle />
    <Root />
  </>,
  document.getElementById('app')
);
