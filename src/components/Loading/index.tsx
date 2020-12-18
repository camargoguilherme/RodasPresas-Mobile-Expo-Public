import React from 'react';
import {ActivityIndicator} from 'react-native';

import {Container} from './styles';

/** COMPONENTS */
import Background from '../../components/Background';

export default function Loading() {
  return (
    <Background
      showLogoBackground
      style={{justifyContent: 'center', alignItem: 'center'}}>
      <Container>
        <ActivityIndicator size="large" color="#00b94a" />
      </Container>
    </Background>
  );
}
