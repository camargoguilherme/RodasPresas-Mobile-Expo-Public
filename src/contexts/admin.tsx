import React, {useState, useContext, createContext, useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

import {IAdminContext, IUser, IUserBlock} from '../interfaces';

import {AuthContext} from '../contexts/auth';

export const AdminContext = createContext<IAdminContext>({});


function AdminProvider({children}) {
  const [pendingUsers, setPendingUsers] = useState<IUser[]>([]);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingStorage, setLoadingStorage] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const {user: myUser} = useContext(AuthContext);

  useEffect(() => {
    async function loadStorage() {
      await usersPendingApproval();
      await users();

      setLoadingStorage(false);
    }
    loadStorage();
  }, []);

  async function storagePendingUsers(dataPendingUsers: IUser[]) {
    console.log('storagePendingUsers', dataPendingUsers)
    await AsyncStorage.setItem('Admin_usersPending', JSON.stringify(dataPendingUsers))
    setPendingUsers(dataPendingUsers);
  }

  function storageAllUsers(dataAllUsers: IUser[]) {
    setAllUsers(dataAllUsers.filter((user) => user.approved && user._id !== myUser._id));
  }

  // Block user
  async function blockUser({_id, blocked, message}: IUserBlock) {
    setLoading(true);
    try {
      const {data} = await api.put('admin/block', {
        userId: _id,
        blocked,
        message: message || 'Sua conta foi bloqueada pelo administrador',
      });
      console.log(message);
      await storageAllUsers(data);
    } catch (error) {
      console.error(error);
      const typeAction = blocked ? 'bloquear' : 'desbloquear';
      Alert.alert(`Falha ao ${typeAction} usuário`, error.message);
    }
    setLoading(false);
  }

  // Aprrove Registration
  async function approveRegistration(userId: string) {
    setLoading(true);
    try {
      const {data} = await api.put('admin/approve', {userId, aproved: true});
      storagePendingUsers([...data].filter((item) => !item.approved));
    } catch (error) {
      console.error(error);
      Alert.alert('Falha ao aprovar cadastro', error.message);
    }
    setLoading(false);
  }

  async function makeUserAdmin(userId: string, admin: boolean) {
    setLoading(true);
    try {
      const {data} = await api.put('admin/make-admin', {userId, admin});
      storageAllUsers(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Falha ao mudar permissão do usuário', error.message);
    }
    setLoading(false);
  }

  // Get Users Pending Approval
  async function usersPendingApproval() {
    setLoadingStorage(true);
    try {
      const params = {
        approved: false,
      };
      const {data} = await api.get('admin/approve', {params});
      // console.log('users-pending-aproval', data);
      storagePendingUsers(data);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Falha buscar usuários pendentes de aprovação',
        error.message
      );
    }
    setLoadingStorage(false);
  }

  // Get All User
  async function users() {
    setLoadingStorage(true);
    try {
      const params = {};
      const {data} = await api.get('admin/users');
      // console.log('users-all', data);
      storageAllUsers(data);
    } catch (error) {
      Alert.alert('Falha ao buscar usuários', error.message);
    }
    setLoadingStorage(false);
  }

  async function refreshPendingApproval() {
    setRefreshing(true);
    await usersPendingApproval();
    setRefreshing(false);
  }

  async function refreshUser() {
    setRefreshing(true);
    await users();
    setRefreshing(false);
  }

  return (
    <AdminContext.Provider
      value={{
        pendingUsers,
        allUsers,
        loading,
        loadingStorage,
        refreshing,
        approveRegistration,
        storagePendingUsers,
        blockUser,
        makeUserAdmin,
        refreshPendingApproval,
        refreshUser,
      }}>
      {children}
    </AdminContext.Provider>
  );
}

export default AdminProvider;
