import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex-direction: row;
  /*justify-content: space-between;*/
  align-items: center;
  align-self: flex-start;
  width: 100%;
  height: 60px;
  padding-left: 20px;
  background-color: #0000;
  z-index: 9999998;
`;

export const ButtonMenu = styled.TouchableWithoutFeedback`
  justify-content: center;
  align-items: center;
`;
