import styled from 'styled-components/native';

/** UTILS */
import * as Utils from '../../utils/Utils';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background-color: rgba(58, 55, 56, 0.9);
`;

export const ViewQRCode = styled.View`
  height: 75%;
  width: 95%;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  border-radius: 10px;
`;

export const ContainerQRCode = styled.View`
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
`;

export const TextQRCode = styled.Text`
  text-align: center;
  font-size: 22px;
  margin-top: 25px;
  margin-bottom: 25px;
  color: #fff;
`;

export const ButtonLinkingText = styled.Text`
  text-align: center;
  font-size: 16px;
  margin-top: 25px;
  margin-bottom: 25px;
  color: #fff;
`;

export const TextHeader = styled.Text`
  text-align: center;
  font-size: 18px;
  align-self: center;
  color: #fff;
`;
