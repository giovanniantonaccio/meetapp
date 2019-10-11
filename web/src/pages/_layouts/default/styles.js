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
  max-width: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 5rem;

    input {
      height: 5rem;
      border-radius: 0.4rem;
      font-size: 1.4rem;
      background-color: rgba(0, 0, 0, 0.2);
      padding: 0 2rem;
      margin-bottom: 1rem;
      color: #fff;
      -webkit-transition-delay: 9999s;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    button {
      height: 5rem;
      border-radius: 0.4rem;
      background-color: #f94d6a;
      margin: 0.5rem 0 2rem;
      font-size: 1.8rem;
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
    font-size: 1.6rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.6);

    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }

  span {
    color: #f94d6a;
    align-self: flex-start;
    margin: 0 0 1rem;
    font-weight: bold;
  }
`;
