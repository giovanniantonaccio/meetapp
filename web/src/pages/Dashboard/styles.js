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

  div {
    display: flex;
    justify-content: space-between;

    h1 {
      font-size: 3.2rem;
      font-weight: bold;
      color: #fff;

      @media (max-width: 480px) {
        font-size: 2.4rem;
        padding: 0.8rem 1.4rem;
      }
    }

    button {
      background: #f94d6a;
      color: #fff;
      font-size: 1.6rem;
      font-weight: bold;
      padding: 1.2rem 2rem;
      border-radius: 0.4rem;
      display: flex;
      align-items: center;

      @media (max-width: 480px) {
        font-size: 1.2rem;
        padding: 0.8rem 1.4rem;
      }

      &:hover {
        background: ${darken(0.04, '#d44059')};
      }

      svg {
        margin-right: 1rem;
        font-size: 2rem;

        @media (max-width: 480px) {
          margin-right: 0.5rem;
          font-size: 1.5rem;
        }
      }
    }
  }

  ul {
    margin-top: 5rem;

    li {
      background: rgba(0, 0, 0, 0.1);
      padding: 2rem 3rem;
      border-radius: 0.4rem;
      display: flex;
      align-items: center;

      & + li {
        margin-top: 1rem;
      }

      div {
        display: flex;
        flex: 1;
        align-items: center;

        @media (max-width: 720px) {
          display: block;
          width: 10rem;
          flex: auto;
        }

        strong {
          font-size: 1.8rem;
          font-weight: bold;
          color: #fff;
          flex: 2;
          display: flex;
          justify-content: flex-start;
          margin-right: 2rem;

          @media (max-width: 720px) {
            font-size: 1.6rem;
          }
        }

        p {
          font-size: 1.4rem;
          color: rgba(255, 255, 255, 0.6);
          margin-right: 1.8rem;
          display: flex;
          flex: 1;
          justify-content: flex-end;
          text-align: center;

          @media (max-width: 720px) {
            justify-content: flex-start;
            margin-top: 0.5rem;
          }
        }
      }

      svg {
        color: #fff;
        font-size: 2.4rem;
      }
    }
  }
`;
