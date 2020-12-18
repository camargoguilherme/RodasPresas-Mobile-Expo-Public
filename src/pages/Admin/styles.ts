import styled from 'styled-components/native';

/** UTILS */
import * as Utils from '../../utils/Utils';

/** COMPONENTS */
import Button from '../../components/Button';
import Input from '../../components/Input';

export const Container = styled.View`
  flex: 1;
  width: ${Utils.widthPercentageToDP('100')};
  height: ${Utils.heightPercentageToDP('95')};
  justify-content: center;
  background-color: rgba(58, 55, 56, 0.9);
`;

export const EmpytView = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(58, 55, 56, 1);
`;

export const InputModal = styled(Input)`
  width: 95%;
  height: 45px;
  text-align: center;
  justify-content: center;
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: ${Utils.heightPercentageToDP('2')};
`;

export const TextInfoModal = styled.Text`
  text-align: center;
  font-size: 18px;
  align-self: center;
  color: #fff;
`;

export const TextHeader = styled.Text`
  text-align: center;
  font-size: 18px;
  align-self: center;
  color: #fff;
`;

export const ViewButtonModal = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 15px;
`;

export const ButtonUserInfo = styled.TouchableWithoutFeedback`
  width: ${Utils.widthPercentageToDP('100')};
  height: 60px;
  flex-direction: row;
  margin-left: 4px;
  margin-right: 4px;
`;

export const ViewUserInfo = styled.View`
  width: ${Utils.widthPercentageToDP('95')};
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent/*#c4c4c4ee*/;
  margin-left: 4px;
  margin-right: 4px;
`;

export const ViewSearchBar = styled.View`
  border-color: #3a3738;
  justify-content: center;
  align-self: center;
  flex-direction: row;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 45px;
  width: ${Utils.widthPercentageToDP('95')};
`;

export const SearchBar = styled(Input)`
  flex: 1;
  margin-left: 0px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const ButtonCancel = styled.TouchableOpacity`
  height: 45px;
  justify-content: center;
  align-items: center;
  align-self: center;
  background: rgba(255, 255, 255, 1);
  margin-right: 10px;
`;

export const ImageProfile = styled.Image`
  border-radius: 10px;
  width: 45px;
  height: 45px;
  border-width: 1px;
  border-color: #FFF;
  align-self: center;
`;

export const UserInfo = styled.View`
  justify-content: center;
  align-items: center;
`;

export const TextInfo = styled.Text`
  flex: 0.5;
  text-align: center;
  font-size: 14px;
  align-self: center;
  color: #FFF;
  font-weight: bold;
`;

export const ButtonApprove = styled(Button)`
  width: 90px;
  height: 35px;
  align-self: center;
  margin-top: 0px;
  background-color: #00b94a;
`;

export const ButtonBlock = styled(Button)`
  width: 90px;
  height: 35px;
  align-self: center;
  margin-top: 0px;
`;

export const ButtonText = styled.Text`
  text-align: center;
  font-size: 14px;
  align-self: center;
  color: #FFF;
`;
