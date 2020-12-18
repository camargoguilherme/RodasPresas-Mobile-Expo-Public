import React, {useState, useContext, useEffect} from 'react';
import {Platform, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

/** CONTEXTS */
import {AuthContext} from '../../contexts/auth';

/** COMPONENTS */
import Button from '../../components/Button';
import Input from '../../components/Input';
import Background from '../../components/Background';

import { registerForPushNotifications} from '../../services/notification'

import {Container, AreaInput, TextInfo, SubmitText} from './styles';

export default function SignUp() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fcmToken, setFcmToken] = useState('');

  const {signUp, loadingAuth} = useContext(AuthContext);

  useEffect(() => {
    registerForPushNotifications().then((token) => {
      setFcmToken(token)
    })
  }, [])

  function handleSignUp() {

    signUp(
      name.trim(),
      email.trim(),
      password.trim(),
      fcmToken
    ).then((result) =>
      navigation.navigate('SignIn')
      // console.log('signUp', result)
    );
  }
  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <TextInfo>Informe seus dados para realizar o cadastro</TextInfo>
        <AreaInput>
          <Input
            icon={{
              name: 'user',
            }}
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="words"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </AreaInput>
        <AreaInput>
          <Input
            icon={{
              name: 'envelope',
            }}
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </AreaInput>
        <AreaInput>
          <Input
            icon={{
              name: 'lock',
            }}
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </AreaInput>
        <Button onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </Button>
      </Container>
    </Background>
  );
}
