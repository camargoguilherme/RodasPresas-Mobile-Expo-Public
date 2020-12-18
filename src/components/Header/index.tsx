import React from 'react';
import {View} from 'react-native';
import {FontAwesome5 as Icon} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

/** UTILS */
import { normalize } from '../../utils/Utils';

import {Container, ButtonMenu} from './styles';

export default function Header({style, children}) {
  const navigation = useNavigation();
  return (
    <Container style={style}>
      <ButtonMenu style={{justifyContent: 'flex-start'}} onPress={() => navigation.toggleDrawer()}>
        <Icon name="bars" color="#FFF" size={35} />
      </ButtonMenu>
      <View style={{alignItems: 'flex-start', marginLeft: normalize(-25),width: '100%'}}>
        {children}
      </View>
    </Container>
  );
}
