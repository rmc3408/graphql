import styled from 'styled-components';
import { Container as DefaultContainer } from 'components/DefaultContainer/styles';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 80vh;

  ${DefaultContainer} {
    margin-bottom: 0;
  }

  h1,
  p {
    margin-bottom: 3rem;
  }
`;
