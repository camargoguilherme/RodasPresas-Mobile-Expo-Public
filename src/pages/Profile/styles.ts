import styled from 'styled-components/native';

/** COMPONENTS */
import MyInput from '../../components/Input';

/** UTILS */
import * as Utils from '../../utils/Utils';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  position: relative;
  background-color: rgba(58, 55, 56, 0.9);

`;

export const ViewProfile = styled.View`
  flex: 1;
  position: relative;
  width: 100%;
  height: ${Utils.normalize(80)};
`;

export const ImageProfile = styled.ImageBackground.attrs({
  imageStyle: {
    borderRadius: 20
  }
})`
  margin-top: 10px;
  width: ${Utils.normalize(100)};
  height: ${Utils.normalize(100)};
  border-width: 2px;
  border-color: #3a3738;
  align-self: center;
  flex-direction: column;
`;

export const ProgressBar = styled.View`
  flex: ${(props) => props.percent};
  background: ${(props) => props.background || 'transparent'};
  border-radius: 20px;
`;

export const Name = styled.Text`
  text-align: center;
  font-size: 28px;
  margin-top: 15px;
  margin-bottom: 5px;
  color: #fff;
`;

export const TextPercentage = styled.Text`
  position: absolute;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  align-self: center;
  margin-top: ${Utils.normalize(40)};;
  z-index: 10;
  color: #2193f3;
`;

export const ChangePhoto = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-left: 35%;
  margin-top: -30px;
`;

export const TextInfo = styled.Text`
  text-align: center;
  font-size: 20px;
  align-self: center;
  color: #fff;
`;

export const ViewInfo = styled.View`
  flex: 6;
  width: 100%;
  margin-top: 60px;
  justify-content: flex-start;
`;

export const ViewAreaField = styled.ScrollView`
  padding-left: 10px;
  padding-right: 10px;
`;

export const AreaField = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /*border-width: 1px;*/
  margin-top: 2px;
  border-color: #3a3738;
  background: #201f1f;
  border-radius: 4px;
`;

export const Field = styled.View`
  flex-direction: row;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 0px;
`;

export const TextField = styled.Text`
  margin-left: 20px;
  text-align: center;
  font-size: ${Utils.normalize(14)};
`;

export const ButtonEdit = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: transparent;
  margin-right: 10px;
`;

export const InputModal = styled(MyInput)`
  width: 95%;
  height: 45px;
  text-align: center;
  justify-content: center;
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: ${Utils.normalize(12)};
`;

export const ViewButton = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 15px;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

export const TextHeader = styled.Text`
  text-align: center;
  font-size: 18px;
  align-self: center;
  color: #fff;
`;
