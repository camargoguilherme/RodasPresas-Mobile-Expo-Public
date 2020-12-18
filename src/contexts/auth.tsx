import React, {useState, useContext, createContext, useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Yup from 'yup';

/** SERVICES */
import api from '../services/api';

/** UTILS */
import {
  validateFields,
  validatePassword,
  validateEmail,
} from '../utils/validation';

import {IAuthContext, IUser} from '../interfaces';
import { registerForPushNotifications } from '../services/notification';
import {SocketIOContext} from '../contexts/socket'

export const AuthContext = createContext<IAuthContext>({});

function AuthProvider({children}) {
  const [user, setUser] = useState<IUser>();
  const [useFingerPrint, setUseFingerPrint] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingStorage, setLoadingStorage] = useState<boolean>(true);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);

  const {setFcmToken} = useContext(SocketIOContext);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('Auth_user');
      const fcmToken = await registerForPushNotifications()


      if (storageUser) {
        const userInfo = JSON.parse(storageUser);
        setFcmToken({...userInfo, fcmToken});
        setUser(userInfo);
      }

      setLoadingStorage(false);
      setLoading(false);
    }
    loadStorage();
  }, []);

  async function storageUser(dataUser: IUser) {
    try {
      console.log(dataUser);
      setUser(dataUser);
      await AsyncStorage.setItem('Auth_user', JSON.stringify(dataUser));
    } catch (error) {
      console.log(error);
    }
  }

  async function storageToken(dataToken: string) {
    await AsyncStorage.setItem('Auth_token', dataToken);
  }

  // SignIn user
  async function signIn(email: string, password: string) {
    setLoadingAuth(true);
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .required('Email é obrigatório')
        .email('Informe um email vãlido'),
      password: Yup.string().required('Senha é abrigatorio'),
    });

    const validadte = await validationSchema
      .validate(
        {
          email,
          password,
        },
        {abortEarly: false}
      )
      .catch((error) => {
        Alert.alert('Campos obrigatórios', error.errors.join('\n'));
        setLoadingAuth(false);
      });
    if (!validadte.errors) {
      interface DataApi {
        data: {
          user: IUser;
          token: string;
        };
      }
      const {data}: DataApi = await api
        .post('sessions', {email, password})
        .catch((error) => {
          setLoadingAuth(false);
          Alert.alert('Falha ao realizar Login', error.message);
        });
      setUseFingerPrint(false);
      setLoadingAuth(false);
      storageUser(data.user);
      storageToken(data.token);
    }
  }

  // SignUp user
  async function signUp(name: string, email: string, password: string, fcmToken:string) {
    setLoadingAuth(true);

    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      email: Yup.string()
        .required('Email é obrigatório')
        .email('Informe um email vãlido'),
      password: Yup.string()
        .required('A senha é obrigatória')
        .min(6, 'A senha tem que ter no mínimo 6 caracteres'),
    });

    const validadte = await validationSchema
      .validate(
        {
          name,
          email,
          password,
        },
        {abortEarly: false}
      )
      .catch((error) => {
        Alert.alert('Campos obrigatórios', error.errors.join('\n'));
        setLoadingAuth(false);
      });
    return new Promise((resolve, reject) => {
      if (!validadte.errors) {
        api
          .post('users', {name, email, password, fcmToken})
          .then(({data}) => {
            Alert.alert('Cadastro realizado', data.message);
            setLoadingAuth(false);
            resolve(data);
          })
          .catch((error) => {
            setLoadingAuth(false);
            Alert.alert('Falha ao realizar cadastro', error.message);
            reject();
          });
      }
    });
  }

  async function signOut() {
    await AsyncStorage.multiRemove(['Auth_user', 'Auth_token']);
    setUser(null);
    setUseFingerPrint(false);
  }

  async function updateFields({...fields}) {
    let editable = false;
    setLoading(true);
    const validate = await validateFields(fields);

    if (!validate.errors) {
      try {
        const {data} = await api.put('users', fields);


        await storageUser({...user, ...fields});
      } catch (error) {
        Alert.alert('Falha ao atualizar dados', error.message);
      }
    } else {
      Alert.alert('Campos obrigatórios', validate.errors.join('\n'));
      editable = true;
    }
    setLoading(false);
    return editable;
  }

  async function changePassword(password: string, confirmPassword: string) {
    let result = false;
    setLoading(true);
    const validate = await validatePassword(password, confirmPassword);

    if (!validate.errors) {
      try {
        const {data} = await api.put('users/change-password', {password, confirmPassword});
        console.log(data);
        await storageUser(data);
        Alert.alert('Ação realizada', 'Senha atualizada com sucesso');
      } catch (error) {
        console.log(error);
        result = true;
        Alert.alert('Falha ao atualizar senha', error.message);
      }
    } else {
      result = true;
      Alert.alert('Falha na validação da senha', validate.errors.join('\n'));
    }
    setLoading(false);
    return result;
  }

  async function resetPasswordByEmail(email: string) {
    setLoading(true);
    const validate = await validateEmail(email);
    return new Promise(async (resolve, reject) => {
      if (!validate.errors) {
        try {
          const {data} = await api.post('reset-password', {email});
          Alert.alert('Redefinição de senha', data.message);
          resolve();
        } catch (error) {
          Alert.alert('Falha ao redefinir senha', error.message);
          reject();
        }
      } else {
        Alert.alert('Falha na validação do email', validate.errors.join('\n'));
        reject();
      }
      setLoading(false);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        useFingerPrint,
        user,
        loading,
        loadingAuth,
        loadingStorage,
        updateFields,
        signUp,
        signIn,
        signOut,
        changePassword,
        resetPasswordByEmail,
        setUseFingerPrint,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
