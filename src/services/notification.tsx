import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const askPermissions = async () => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    return false;
  }
  return true;
};

export const registerForPushNotifications = async () => {
  const enabled = await askPermissions();
  if (!enabled) {
    return Promise.reject('Sem permissão de notificações');
  }
  // Get the token that uniquely identifies this device
  let result = await Notifications.getExpoPushTokenAsync();

  // console.log(result);

  return result.data;
};
