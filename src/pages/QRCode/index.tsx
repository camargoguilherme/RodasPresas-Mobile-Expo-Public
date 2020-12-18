import React, {useContext, useState, useEffect} from 'react';
import {ActivityIndicator, Alert, Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesome5 as Icon} from '@expo/vector-icons';
import QRCodeSVG from 'react-native-qrcode-svg';

/** CONTEXTS */
import {AuthContext} from '../../contexts/auth';

/** COMPONENTS */
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';

/** UTILS */
import { normalize } from '../../utils/Utils';

/** CONSTANTS */
import { URL_BACKEND } from '../../constants';

import {Container, ViewQRCode, ContainerQRCode, TextQRCode, TextHeader, ButtonLinkingText} from './styles';

export default function QRCode() {
  const {user, loading} = useContext(AuthContext);
  const [percent, setPercent] = useState(0);
  const [isSupported, setIsSupported] = useState(false);

  const urlCard = `${URL_BACKEND}/qr-code/${user._id}`

  useEffect(() =>{
    async function verifySupported(){
      const supported = await Linking.canOpenURL(urlCard);
      setIsSupported(supported);
    }

    verifySupported();

  },[])


  async function handleLinking() {
    await Linking.openURL(urlCard);
  }

  console.log();
  return (
    <Background>
      <Header>
        <TextHeader>QR Code</TextHeader>
      </Header>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <ViewQRCode>
          <ContainerQRCode>
            <QRCodeSVG
              value={urlCard}
              size={normalize(250)}
              backgroundColor="white"
              color="black"
            />
          </ContainerQRCode>
          <TextQRCode>Escaneie o QR Code</TextQRCode>
        </ViewQRCode>
        {
          isSupported && (
            <Button
              style={{width: '95%', height: 45}}
              onPress={handleLinking}>
                <ButtonLinkingText>Abrir carteirinha</ButtonLinkingText>
            </Button>
          )
        }

      </Container>
    </Background>
  );
}
