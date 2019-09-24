import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  background-image: linear-gradient(to bottom, #22202c, #402845);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    input {
      height: 50px;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.2);
      padding: 0 20px;
      margin-bottom: 10px;
      color: #fff;
      -webkit-transition-delay: 9999s;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    button {
      height: 50px;
      border-radius: 4px;
      background-color: #f94d6a;
      margin: 5px 0 20px;
      font-size: 18px;
      font-weight: bold;
      color: #ffffff;

      &:hover {
        background: ${darken(0.04, '#f94d6a')};
      }
    }
  }

  a {
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.6);

    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
`;
