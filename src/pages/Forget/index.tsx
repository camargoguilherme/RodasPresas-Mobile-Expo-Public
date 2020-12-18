import React, {useState, useContext} from 'react';
import {Platform, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

/** COMPONENTS */
import Button from '../../components/Button';
import Input from '../../components/Input';
import Background from '../../components/Background';

/** CONTEXTS */
import {AuthContext} from '../../contexts/auth';

import {Container, TextInfo, AreaInput, SubmitText} from './styles';

export default function Forget() {
  const {loading, resetPasswordByEmail} = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  function handleResetPassword() {
    resetPasswordByEmail(email).then(() => {
      navigation.navigate('SignIn');
    });
  }
  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <TextInfo>Informe seu email para recuperar a senha</TextInfo>
        <AreaInput>
          <Input
            icon={{
              name: 'envelope',
            }}
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text.trim())}
          />
        </AreaInput>
        <Button onPress={handleResetPassword}>
          {loading ? (
            <ActivityIndicator testID="loading" size={20} color="#fff" />
          ) : (
            <SubmitText>Recuperar senha</SubmitText>
          )}
        </Button>
      </Container>
    </Background>
  );
}
