import { createGlobalStyle, css } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`${css`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html,
  body,
  #root {
    min-height: 100%;
    font-size: 62.5%;

    @media (max-width: 1080px) {
      font-size: 58%;
    }

    @media (max-width: 720px) {
      font-size: 54%;
    }

    @media (max-width: 480px) {
      font-size: 50%;
    }
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body,
  input,
  button {
    font: 1rem 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`}`;
