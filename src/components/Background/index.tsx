import React from 'react';
import {SafeAreaView} from 'react-native';
import {BG, LogoBackground} from './styles';

export default function Background({children, showLogoBackground, ...props}) {
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
      }}>
      <BG colors={['#000000', '#3A3738']} {...props}>
        {showLogoBackground ? (
          <LogoBackground
            source={require('../../assets/Logo.png')}
            resizeMode="contain">
            {children}
          </LogoBackground>
        ) : (
          <>{children}</>
        )}
      </BG>
    </SafeAreaView>
  );
}
