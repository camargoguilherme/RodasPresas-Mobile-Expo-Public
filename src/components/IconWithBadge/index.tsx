import React from 'react';
import {View, Text} from 'react-native';
import {FontAwesome5 as Icon} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import {Container} from './styles';

export default function IconWithBadge({name, badgeCount=0, color, size}) {
  return (
    <Container>
      <Icon name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // If you're using react-native < 0.57 overflow outside of parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 16,
              height: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
    </Container>
  );
}
