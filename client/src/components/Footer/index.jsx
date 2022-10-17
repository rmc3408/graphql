import P from 'prop-types';
import * as Styled from './styles';

export const Footer = () => {
  return (
    <Styled.Container>
      <div>
        <span>&lt;Dev&gt;</span>Raphael Molinaro, 2022<span>&lt;/Dev&gt;</span>
      </div>
    </Styled.Container>
  );
};

Footer.propTypes = {
  children: P.node,
};
