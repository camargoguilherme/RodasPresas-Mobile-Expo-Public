import styled from 'styled-components/native';

/** UTILS */
import * as Utils from '../../utils/Utils';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(58, 55, 56, 0.55);
  position: absolute;
  z-index: 9999999;
`;

export const ViewInput = styled.KeyboardAvoidingView`
  width: 85%;
  height: ${Utils.heightPercentageToDP('30')};
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  background-color: rgba(58, 55, 56, 1);
  border-width: 2px;
  border-color: rgba(38, 35, 36, 1);
`;
