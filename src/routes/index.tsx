import React, {useContext, useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
// import TouchId from 'react-native-touch-id';
import * as LocalAuthentication from 'expo-local-authentication';


/** CONTEXTS */
import {AuthContext} from '../contexts/auth';

/** ROUTES */
import AuthRoutes from '../routes/auth.routes';
import AppRoutes from '../routes/app.routes';

/** COMPONENTS */
import Loading from '../components/Loading';

function Routes() {
  const {
    signed,
    signOut,
    loadingStorage,
    useFingerPrint,
    setUseFingerPrint,
  } = useContext(AuthContext);

  const [isSupported, setIsSupported] = useState(false);
  const [hasFingerprint, setHasFingerprint] = useState(false);

  // Verifica se o dispositivo é compativel com leitor de digitais
  async function checkDeviceForHardware() {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    setIsSupported(compatible);
  };

   // Verifica se o dispositivo contem digital cadastrada
  async function checkForFingerprints() {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    useFingerPrint(fingerprints);
  };

  async function cancelAutentication() {
    await LocalAuthentication.cancelAuthenticate();
  };

  async function scanFingerprint() {
    const options = {
      promptMessage: 'Autenticação requerida',
      fallbackLabel: 'Digitar senha',
      cancelLabel: 'Digitar senha',
    };


    let result = await LocalAuthentication.authenticateAsync(options);
    console.log('Scan Result:', result);
    if(result.success){
      setUseFingerPrint(false)
    }else{
      signOut();
    }
    // this.setState({
    //   result: JSON.stringify(result),
    // });
  };

  useEffect(() => {
    async function verifyAuthentication(){
      await checkDeviceForHardware();
      await checkForFingerprints();
      !isSupported && signOut()
    }

    verifyAuthentication();

  }, []);

  if (loadingStorage) {
    return <Loading />;
  }

  if(!useFingerPrint){
    cancelAutentication()
  }

  // if (isSupported && signed && useFingerPrint) {
  //   scanFingerprint();
  // }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
