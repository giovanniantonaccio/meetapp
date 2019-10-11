import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: space-between;
  height: 9.2rem;
  padding: 3rem 25rem;

  @media (max-width: 1080px) {
    padding: 3rem 15rem;
  }

  @media (max-width: 720px) {
    padding: 3rem 10rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 2rem;
  }

  img {
    height: 3.2rem;
    width: 3.2rem;
  }

  aside {
    display: flex;

    div {
      margin-right: 3rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      strong {
        font-size: 1.4rem;
        color: #fff;
      }

      a {
        font-size: 1.4rem;
        color: #999;
        margin-top: 0.4rem;

        &:hover {
          color: ${lighten(0.15, '#999')};
        }
      }
    }

    button {
      padding: 1rem 2rem;
      color: #fff;
      background: #d44059;
      border-radius: 0.4rem;
      font-weight: bold;
      font-size: 1.6rem;
      line-height: 1rem;

      &:hover {
        background: ${darken(0.04, '#d44059')};
      }
    }
  }
`;
