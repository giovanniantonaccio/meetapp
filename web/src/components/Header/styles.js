import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  height: 92px;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  padding: 30px 250px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;

  img {
    height: 32px;
    width: 32px;
  }

  aside {
    display: flex;

    div {
      margin-right: 30px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      strong {
        font-size: 14px;
        color: #fff;
      }

      a {
        font-size: 14px;
        color: #999;
        margin-top: 4px;

        &:hover {
          color: ${lighten(0.15, '#999')};
        }
      }
    }

    button {
      padding: 10px 20px;
      color: #fff;
      background: #d44059;
      border-radius: 4px;
      font-weight: bold;
      font-size: 16px;

      &:hover {
        background: ${darken(0.04, '#d44059')};
      }
    }
  }
`;
