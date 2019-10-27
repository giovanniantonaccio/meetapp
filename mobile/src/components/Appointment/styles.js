import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  border-radius: 4px;
  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Banner = styled.Image`
  height: 150px;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Info = styled.View`
  padding: 18px;
  background: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
`;

export const InfoTextRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: ${props => (props.last ? '15px' : '0px')};
`;

export const InfoText = styled.Text`
  color: #999;
  font-size: 13px;
  margin-left: 5px;
`;
