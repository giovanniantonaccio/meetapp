import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 2em;
  width: 100%;
  position: relative;
  border-radius: 0.4rem;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  img {
    /* height: 30rem; */
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
  }

  div {
    background: rgba(0, 0, 0, 0.2);
    height: 30rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 1rem;

    svg {
      color: rgba(255, 255, 255, 0.3);
      font-size: 5.4rem;
    }

    p {
      color: rgba(255, 255, 255, 0.3);
      font-size: 2rem;
      font-weight: bold;
    }
  }

  input {
    display: none;
  }
`;
