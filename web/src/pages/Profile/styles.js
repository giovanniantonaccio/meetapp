import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 5.2rem 25rem;

  @media (max-width: 1080px) {
    padding: 5.2rem 15rem;
  }

  @media (max-width: 720px) {
    padding: 5.2rem 10rem;
  }

  @media (max-width: 480px) {
    padding: 5.2rem 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 2rem 0 3rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    width: 100%;

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
      height: 4.2rem;
      border-radius: 0.4rem;
      background-color: #f94d6a;
      margin-top: 2rem;
      font-size: 1.6rem;
      font-weight: bold;
      color: #ffffff;
      width: 16rem;
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: flex-end;

      &:hover {
        background: ${darken(0.04, '#f94d6a')};
      }

      svg {
        margin-right: 1rem;
        font-size: 2rem;
      }
    }

    span {
      color: #f94d6a;
      align-self: flex-start;
      margin: 0 0 1rem;
      font-weight: bold;
    }
  }
`;
