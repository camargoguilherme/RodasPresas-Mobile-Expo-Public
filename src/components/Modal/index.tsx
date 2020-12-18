import React, {useContext} from 'react';
import {Text} from 'react-native';

import {Container, ViewInput} from './styles';

function Modal({children, ...props}) {
  return (
    <Container {...props}>
      <ViewInput>{children}</ViewInput>
    </Container>
  );
}

export default Modal;
