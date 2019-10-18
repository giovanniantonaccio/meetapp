import styled from 'styled-components';

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

  div.detailsHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 720px) {
      flex-direction: column;
      align-items: flex-start;
    }

    h1 {
      font-size: 3.2rem;
      font-weight: bold;
      color: #fff;
    }

    div.buttonRow {
      display: flex;

      @media (max-width: 720px) {
        margin-top: 1rem;
      }

      button {
        border-radius: 0.4rem;
        padding: 0.8rem 1.6rem;
        font-size: 1.4rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        color: #fff;

        & + button {
          margin-left: 1.5rem;
        }

        svg {
          margin-right: 0.5rem;
          font-size: 2rem;
        }
      }

      button.edit {
        background: #4dbaf9;

        :disabled {
          opacity: 0.5;
          cursor: auto;
        }
      }

      button.delete {
        background: #d44059;

        :disabled {
          opacity: 0.5;
          cursor: auto;
        }
      }
    }
  }

  img {
    height: auto;
    width: 100%;
    margin-top: 5.2rem;
    object-fit: fill;
  }

  p {
    padding-top: 2.5rem;
    font-size: 1.6rem;
    color: #fff;
  }

  div.detailsFooter {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 3rem;

    div {
      display: flex;
      align-items: center;
    }

    div.location {
      margin-left: 3rem;
    }

    span {
      color: rgba(255, 255, 255, 0.6);
      font-size: 1.6rem;
      margin-left: 1rem;
    }

    svg {
      color: rgba(255, 255, 255, 0.6);
      font-size: 2rem;
    }
  }
`;
