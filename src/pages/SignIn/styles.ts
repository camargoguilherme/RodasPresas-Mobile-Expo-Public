import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  height: 150px;
  width: 1500px;
  margin-bottom: 30px;
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

export const AreaLink = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 45px;
  width: 90%;
  height: 20px;
`;

export const Link = styled.TouchableOpacity`
  margin: 0px 40px;
`;

export const LinkText = styled.Text`
  color: #fff;
`;
export const AreaCheck = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 45px;
  width: 90%;
  height: 20px;
`;

export const CheckText = styled.Text`
  color: #fff;
`;
