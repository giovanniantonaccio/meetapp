import styled from 'styled-components/native';

import logo from '../../assets/logo.png';

export const Wrapper = styled.SafeAreaView`
  flex: 0;
  background: rgba(0, 0, 0, 0.3);
  flex-direction: row;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  padding-bottom: 30px;
  background: rgba(0, 0, 0, 0.3);
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 24px;
  height: 24px;
`;
