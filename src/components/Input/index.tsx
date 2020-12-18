import React, {useState} from 'react';
import {FontAwesome5 as Icon} from '@expo/vector-icons';

import {Container, TextInput, AreaIcon, SecureButton} from './styles';

export default function Input({icon, secureTextEntry, ...props}) {
  const [show, setShow] = useState(!!secureTextEntry);
  return (
    <Container {...props}>
      {icon && (
        <AreaIcon>
          <Icon size={20} color="rgba(0, 0, 0, 0.4)" {...icon} />
        </AreaIcon>
      )}
      <TextInput {...props} secureTextEntry={show} />
      {secureTextEntry && (
        <AreaIcon>
          <SecureButton onPress={() => setShow(!show)}>
            <Icon
              size={20}
              color="rgba(0, 0, 0, 0.4)"
              {...icon}
              name={!show ? 'eye' : 'eye-slash'}
            />
          </SecureButton>
        </AreaIcon>
      )}
    </Container>
  );
}
