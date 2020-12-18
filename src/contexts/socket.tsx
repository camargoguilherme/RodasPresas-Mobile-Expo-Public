import React, {useState, useContext, createContext, useEffect} from 'react';
import SocketIO from '../services/socket.io';

import {ISocketIOContext, IUser, IUserBlock} from '../interfaces';

import {AdminContext} from '../contexts/admin'

export const SocketIOContext = createContext<ISocketIOContext>({});


function SocketIOProvider({children}) {
  const [usersPendingApprove, setUsersPendingApprove] = useState<IUser[]>([]);
  const [fcmToken, setFcmToken] = useState<IUser>({});

  const {storagePendingUsers} = useContext(AdminContext);

  useEffect(() =>{
    SocketIO.on('usersPendingApprove', (users) => {
      console.log('carregano usuarios pendentes de aprovação', users.length)
      storagePendingUsers(users)
    });
  }, [])

  useEffect(() => {
    SocketIO.emit('updateFcmToken', fcmToken);
    console.log('SocketIOContext->Atualizando FCM')
  }, [fcmToken])


  return (
    <SocketIOContext.Provider
      value={{
        fcmToken,
        setFcmToken,
      }}>
      {children}
    </SocketIOContext.Provider>
  );
}

export default SocketIOProvider;
