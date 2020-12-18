import React, {useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

/** COMPONENTS */
import IconWithBadge from '../../components/IconWithBadge';

/** UTILS */
import {sourceProfle} from '../../utils/profile';

/** CONTEXTS */
import {AuthContext} from '../../contexts/auth';

import {Container, Text, NameText, Image} from './styles';


export default function Drawer(props) {
  const {user, signOut} = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <Container>
        <Image source={sourceProfle(user)} />
        <Text>Bem-vindo</Text>
        <NameText>{user && user.name}</NameText>
      </Container>
      <DrawerItemList {...props} />
      <DrawerItem
        {...props}
        label="Sair"
        inactiveBackgroundColor="#C62C36"
        onPress={signOut}
        icon={ ({focused}) => <IconWithBadge name='sign-out-alt' size={25} color={focused ? '#FFF' : '#DDD'}/> }
      />
    </DrawerContentScrollView>
  );
}
