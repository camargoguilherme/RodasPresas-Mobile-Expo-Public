import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  margin-bottom: 30px;
`;

export const TextInfo = styled.Text`
  text-align: center;
  font-size: 20px;
  align-self: center;
  margin-top: -10%;
  margin-bottom: 10%;
  color: #fff;
`;

export const AreaInput = styled.View`
  flex-direction: row;
`;

export const SubmitText = styled.Text`
  font-size: 20px;
  color: #fff;
`;
