import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
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

export const SubmitButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #00b94a;
  width: 90%;
  height: 45px;
  border-radius: 7px;
  margin-top: 10px;
`;
export const SubmitText = styled.Text`
  font-size: 20px;
  color: #fff;
`;
