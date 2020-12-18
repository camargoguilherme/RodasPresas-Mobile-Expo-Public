import {Platform, Alert} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import ImageCropPicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-community/async-storage';

import firebase from './firebaseConnection';

// export const checkPermissions = async () => {
//   const perm = await Permissions.getAsync()
//   alert('checking permissions' + perm)
//   console.log('checking permissions', perm)

//   const [permission, askForPermission] = Permissions.usePermissions(
//     ['camera', 'cameraRoll', 'notifications'],
//     {ask: true}
//     );

//   if (!permission || permission.status !== 'granted') {
//     askForPermission();
//   }
// }

export const checkPermissions = async () => {
  // const {status, permissions} = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
  // console.log('checking permissions', permissions)
  if (Platform.OS !== 'web') {
    const { status: statusCamera } = await ImagePicker.requestCameraPermissionsAsync();
    if(statusCamera !== 'granted'){
      console.log('Pemissão para acesso a camera não concedida')
    }
    const { status: statusCameraRoll } = await ImagePicker.requestCameraRollPermissionsAsync();
    if(statusCameraRoll !== 'granted'){
      console.log('Pemissão para acesso a galeria não concedida')
    }

  }
}

async function uploadToFirebase(
  file: any,
  userId: string,
  setPercent: Function,
  setUrlStorage: Function,
  setUpload: Function
) {

  const storageRef = firebase.storage().ref('users');
  try {
    const uploadTask = storageRef.child(`${userId}/profile.jpg`).put(file, {
      contentType: file.type,
    });
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(progress.toFixed(2));

        console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log('Error on upload', error);
        setUpload();
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('URL do arquivo:', downloadURL);
          setUrlStorage(downloadURL);
          setUpload();
        });
      }
    );
  } catch (error) {
    console.log(error);
    setUpload();
  }
}

export const selectPhotoTapped = async (
  userId: string,
  fromCameraOrGalery: ('camera' | 'galery') = 'camera',
  setPreview: Function,
  setImage: Function,
  setPercent: Function,
  setUrlStorage: Function,
  setUpload: Function
) => {
  const options = {
    mediaType: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    allowsMultipleSelection: false,

  };

  await checkPermissions();


  const result =
    fromCameraOrGalery === 'camera'
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);

  if(!result.cancelled){
    console.log(result);

    let prefix = new Date().getTime();
    let ext = 'jpeg'


    const URI_PATH = Platform.OS === 'android' && result.uri.replace('file://', '')

    const image = {
      uri: URI_PATH,
      type: `image/${ext}`,
      name: `IMG_${prefix}.${ext}`,
    };

    const res = await fetch(image.uri);
    const blob = await res.blob();

    console.log(image);
    setPreview(image);
    setImage(image);

    uploadToFirebase(blob, userId, setPercent, setUrlStorage, setUpload).catch(
      (error) => {
        setUpload();
        Alert.alert(
          'Falha ao carregar imagem',
          [
            'Houve algum problema ao carregar imagem de perfil',
            'Tente novamente mais tarde!',
          ].join('\n')
        );
      }
    );

  }else{
    setUpload();
  }
};
