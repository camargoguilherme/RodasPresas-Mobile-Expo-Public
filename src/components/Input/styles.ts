import styled from 'styled-components/native';

export const Container = styled.View`
  width: 90%;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 1);
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(0, 0, 0, 0.40)',
})`
  flex: 1;
  height: 45px;
  font-size: 18px;
  color: #131313;
`;

export const AreaIcon = styled.View`
  flex: 0.1;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
`;

export const SecureButton = styled.TouchableWithoutFeedback``;
