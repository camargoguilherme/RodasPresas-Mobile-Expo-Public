import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Alert, LogBox, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import * as Notifications from 'expo-notifications'

import { registerForPushNotifications } from './src/services/notification';
import AuthProvider from './src/contexts/auth';
import SocketIOProvider from './src/contexts/socket';

import Routes from './src/routes';

// const {messaging} = firebase;

LogBox.ignoreAllLogs(true)

export default function App() {
  useEffect(() => {
    registerForPushNotifications().then( (token) => {
      console.log('Token FCM', token)
    }).catch(console.log);

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
      handleError: (notificationId, error) =>{
        console.log('An error FCM has happened!', JSON.stringify({notificationId, error}));
      },
      handleSuccess: (notificationId) =>{
        console.log('A new FCM message arrived!', JSON.stringify(notificationId))
      },
    });

    // Notifications.addNotificationResponseReceivedListener(({request}) =>{
    //   const { content } = request
    //   console.log(`Response - ${content.title}`);

    //   Notifications.requestPermissionsAsync(function (result) {
    //     if (result === "granted") {
    //       navigator.serviceWorker.ready.then(function (registration) {
    //         registration.showNotification(`${content.title}`, {
    //           body: content.body,
    //         });
    //       });
    //     }
    //   });
    // });


    const notificationSubscription = Notifications.addNotificationReceivedListener(({request}) =>{
      const { content } = request
      console.log(`Receive - ${content.title}`);

      Notifications.requestPermissionsAsync(function (result) {
        if (result === "granted") {
          navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(`${content.title}`, {
              body: content.body,
            });
          });
        }
      });
    });

    return notificationSubscription.remove;
  }, []);

  // async function showAlert(title, message) {
  //   Alert.alert(
  //     title,
  //     message,
  //     [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  //     {cancelable: false}
  //   );
  // }



  return (
    <NavigationContainer>
      <SocketIOProvider>
        <AuthProvider>
          <StatusBar backgroundColor="#131313" barStyle="light-content" />
          <Routes />
        </AuthProvider>
      </SocketIOProvider>
    </NavigationContainer>
  );
}
