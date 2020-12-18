import React, {useState, useContext} from 'react';
import {Platform, ActivityIndicator, Image, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';

/** CONTEXTS */
import {AuthContext} from '../../contexts/auth';

/** COMPONENTS */
import Button from '../../components/Button';
import Input from '../../components/Input';
import Background from '../../components/Background';

import {
  Container,
  Logo,
  AreaInput,
  SubmitText,
  AreaLink,
  Link,
  LinkText,
} from './styles';

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn, loadingAuth} = useContext(AuthContext);

  async function handleLogin() {
    Keyboard.dismiss();
    await signIn(email.trim(), password.trim());
  }


  return (
    <Background showLogoBackground={false}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <Logo source={require('../../assets/Logo.png')} resizeMode="contain" />
        <AreaInput>
          <Input
            testID="email-input"
            icon={{
              name: 'envelope',
            }}
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </AreaInput>
        <AreaInput>
          <Input
            testID="password-input"
            icon={{
              name: 'lock',
            }}
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
        </AreaInput>
        <Button onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator testID="loading" size={20} color="#fff" />
          ) : (
            <SubmitText>Entrar</SubmitText>
          )}
        </Button>
        <AreaLink>
          <Link
            onPress={() => navigation.navigate('SignUp')}
            hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
            >
            <LinkText>Criar uma conta!</LinkText>
          </Link>
          <Link
            onPress={() => navigation.navigate('Forget')}
            hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
            >
            <LinkText>Esqueci minha senha...</LinkText>
          </Link>
        </AreaLink>
      </Container>
    </Background>
  );
}
