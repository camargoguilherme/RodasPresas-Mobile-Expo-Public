import React, {useState, useContext, useRef, useEffect} from 'react';
import {
  Alert,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import QRCodeSVG from 'react-native-qrcode-svg';
import socket from '../../services/socket.io'

import * as ScreenOrientation from 'expo-screen-orientation';
import {FontAwesome5 as Icon} from '@expo/vector-icons';

/** UTILS */
import {sourceProfle} from '../../utils/profile';
import {formatIdCard} from '../../utils/format';
import {widthPercentageToDP, heightPercentageToDP, normalize} from '../../utils/Utils';

/** SERVICES */
import {checkPermissions} from '../../services/upload-image';

/** CONTEXTS */
import {AuthContext} from '../../contexts/auth';

/** COMPONENTS */
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import {
  Container,
  Card,
  Flip,
  ImageProfile,
  ViewProfile,
  AreaInfo,
  QRCodeText,
  Name,
  Title,
  Info,
  ViewInfo,
  Separator,
  InputModal,
  ViewButton,
  ButtonText,
  TextInfo,
  Logo
} from './styles';
import { TextHeader } from '../Admin/styles';

export default function Home() {
  let refCardFlip = useRef();
  const navigation = useNavigation();
  const {user, loadingAuth, loading, changePassword} = useContext(AuthContext);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const titles = {
    validity: 'Validade',
    city: 'Cidade',
    bloodType: 'Tipo Sanguíneo',
    healthPlan: 'Plano de Saúde',
    cpf: 'CPF',
    emergencyPhone: 'Telefone de Emergência',
    allergic: 'Alérgico',
    motorcycle: 'Moto',
    licensePlate: 'Placa',
  };

  async function handleChangePassword() {
    await changePassword(password, confirmPassword);
  }

  return (
    <Background
      showLogoBackground
    >
      <Header>
        <TextHeader>
          Tela Inicial
        </TextHeader>
      </Header>
      <Container>
        <Flip
          ref={(card) => (refCardFlip = card)}
          flipDirection="x"
          duration={1500}>
          <TouchableWithoutFeedback onPress={() => refCardFlip.flip()}>
            <Card>
              <AreaInfo>
                <View
                  style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                  }}>
                  <ViewInfo>
                    <Title>{titles.city}:</Title>
                    <Info>{user && user.city}</Info>
                  </ViewInfo>
                  <ViewInfo>
                    <Title>{titles.bloodType}:</Title>
                    <Info>{user && user.bloodType}</Info>
                  </ViewInfo>
                  <ViewInfo>
                    <Title>{titles.healthPlan}:</Title>
                    <Info>{user && user.healthPlan}</Info>
                  </ViewInfo>
                  <ViewInfo>
                    <Title>{titles.cpf}:</Title>
                    <Info>{user && user.cpf}</Info>
                  </ViewInfo>
                  <ViewInfo>
                    <Title>{titles.emergencyPhone}:</Title>
                    <Info>{user && user.emergencyPhone}</Info>
                  </ViewInfo>
                  <ViewInfo>
                    <Title>{titles.allergic}:</Title>
                    <Info>{user && user.allergic}</Info>
                  </ViewInfo>
                  <ViewInfo>
                    <Title>{titles.motorcycle}:</Title>
                    <Info>{user && user.motorcycle}</Info>
                  </ViewInfo>
                  <ViewInfo>
                    <Title>{titles.licensePlate}:</Title>
                    <Info>{user && user.licensePlate}</Info>
                  </ViewInfo>
                  <ViewInfo>
                    <Title>{titles.validity}:</Title>
                    <Info>{user && user.validity}</Info>
                  </ViewInfo>
                </View>
                <View style={{
                      justifyContent: 'flex-start',
                      alignItems: "center",
                      flexDirection: 'column'}}>
                  <View
                    style={{
                      flex: 1
                    }}>
                    <ImageProfile source={sourceProfle(user)} />
                    <Name>{user && user.name}</Name>
                  </View>
                  <QRCodeSVG
                    value={`https://rodaspresas.herokuapp.com/qr-code/${user._id}`}
                    size={normalize(100)}
                    backgroundColor="white"
                    color="black"
                  />
                </View>
              </AreaInfo>
              <Title style={{alignSelf: "center"}}>{formatIdCard(user._id).toUpperCase()}</Title>
            </Card>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => refCardFlip.flip()}>
            <Card>
              <Logo source={require('../../assets/Logo.png')} resizeMode="contain" />
            </Card>
          </TouchableWithoutFeedback>
        </Flip>
        <Button
          style={{marginTop: -45, marginBottom: 30, width: '95%', height: 45}}
          onPress={() => navigation.navigate('QR Code')}>
          {loadingAuth ? (
            <ActivityIndicator testID="loading" size={20} color="#fff" />
          ) : (
            <QRCodeText>QR Code</QRCodeText>
          )}
        </Button>

        {user?.passwordReseted && (
          <Modal>
            <TextInfo>Informe uma nova senha</TextInfo>
            <InputModal
              placeholder="Senha"
              autoCorrect={false}
              autoCapitalize="none"
              value={password}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <InputModal
              placeholder="Confirme a senha"
              autoCorrect={false}
              autoCapitalize="none"
              value={confirmPassword}
              secureTextEntry
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <ViewButton>
              <Button
                style={{width: '45%', marginTop: 0}}
                onPress={handleChangePassword}>
                {loading ? (
                  <ActivityIndicator size={20} color="#fff" />
                ) : (
                  <ButtonText>Salvar</ButtonText>
                )}
              </Button>
            </ViewButton>
          </Modal>
        )}
      </Container>
    </Background>
  );
}
