import styled from 'styled-components/native';
import CardFlip from 'react-native-card-flip';

/** COMPONENTS */
import MyInput from '../../components/Input';

/** UTILS */
import * as Utils from '../../utils/Utils';

const font = Utils.heightPercentageToDP('2')

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(58, 55, 56, 0.9);
  justify-content: center;

`;

export const Flip = styled(CardFlip)`
  width: 85%;
  height: 85%;
  align-content: center;
  align-self: center;
`;

export const Card = styled.View`
  width: ${Utils.heightPercentageToDP('70')}px;
  height: ${Utils.heightPercentageToDP('50')}px;
  top: 60px;
  padding: ${Utils.normalize(10)}px;
  border-radius: 20px;
  transform: rotate(90deg);
  align-self: center;
  background-color: #201f1f;
`;

export const LogoBackground = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-self: center;
`;

export const Logo = styled.Image`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-self: center;
`;

export const ViewProfile = styled.View`
  flex: 0.35;
`;

export const QRCodeText = styled.Text`
  font-size: 20px;
  color: #fff;
`;

export const ImageProfile = styled.Image`
  width: ${Utils.normalize(100)}px;
  height: ${Utils.normalize(100)}px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #3a3738;
  align-self: center;
`;

export const Name = styled.Text`
  text-align: center;
  font-size: ${Utils.normalize(12)}px;
  color: #fff;
  align-self: center;
`;

export const AreaInfo = styled.View`
  flex: 1;
  border-radius: 20px;
  flex-direction: row;
  /*background-color: rgba(255, 255, 255, 0.75);*/
  justify-content: center;
  align-items: center;
`;

export const ViewInfo = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const Title = styled.Text`
  text-align: left;
  font-size: ${Utils.normalize(14)}px;
  /*margin-left: 5px;*/
  font-weight: bold;
  color: #ffffff;
  /*color: #1e1818;*/
`;

export const Info = styled.Text`
  text-align: left;
  font-size: ${Utils.normalize(12)}px;
  /*margin-left: 15px;*/
  color: #ffffff;
  /*color: #3a3738;*/
`;

export const Separator = styled.View`
  width: 90%;
  height: 2px;
  background: #545454;
  margin-left: 5%;
  justify-content: center;
  align-items: center;
`;

export const InputModal = styled(MyInput)`
  width: 95%;
  height: 45px;
  text-align: center;
  justify-content: center;
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: ${Utils.normalize(14)}px;
`;

export const ViewButton = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 15px;
`;

export const ButtonText = styled.Text`
  font-size: ${Utils.normalize(14)}px;
  color: #fff;
  font-weight: bold;
`;

export const TextInfo = styled.Text`
  text-align: center;
  font-size: ${Utils.normalize(16)}px;
  align-self: center;
  color: #fff;
`;


export const TextHeader = styled.Text`
  text-align: center;
  font-size: 18px;
  align-self: center;
  color: #fff;
`;
