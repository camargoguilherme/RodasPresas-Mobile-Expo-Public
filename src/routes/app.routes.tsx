import React, {useContext, useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';

/** PAGES */
import Admin from '../pages/Admin';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import QRCode from '../pages/QRCode';

/** COMPONENTS */
import Drawer from '../components/Drawer';
import IconWithBadge from '../components/IconWithBadge';

/** CONTEXTS */
import {AuthContext} from '../contexts/auth';
import {SocketIOContext} from '../contexts/socket';

/** PROVIDERS */
import AdminProvider from '../contexts/admin';

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
  const {user} = useContext(AuthContext);
  const [pendingUsers, setPendingUsers] = useState([])

  useEffect(() =>{
    async function loadPendingUsers(){
      const users = await AsyncStorage.getItem('Admin_usersPending');
      users && setPendingUsers(JSON.parse(users));
      console.log('app.routes', users)
    }
    loadPendingUsers();
  }, [user])

  function AdminScreenn(){
    return <AdminProvider>
      <Admin />
    </AdminProvider>
  }

  return (
      <AppDrawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <Drawer {...props} />}
        drawerStyle={{
          backgroundColor: '#3A3738',
        }}
        drawerContentOptions={{
          labelStyle: {
            fontWeight: 'bold',
          },
          activeTintColor: '#FFF',
          activeBackgroundColor: '#2193F3',
          inactiveBackgroundColor: '#545454',
          inactiveTintColor: '#DDD',
          itemStyle: {
            marginVertical: 5,
          },
        }}>
        <AppDrawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerIcon: ({focused}) => <IconWithBadge name='home' size={25} color={focused ? '#FFF' : '#DDD'}/>
          }}
        />
        <AppDrawer.Screen
          name="Perfil"
          component={Profile}
          options={{
            drawerIcon: ({focused}) => <IconWithBadge name='user' size={25} color={focused ? '#FFF' : '#DDD'}/>
          }}
        />
        <AppDrawer.Screen
          name="QR Code"
          component={QRCode}
          options={{
            drawerIcon: ({focused}) => <IconWithBadge name='qrcode' size={25} color={focused ? '#FFF' : '#DDD'}/>
          }}
        />
        {user.admin && (
            <AppDrawer.Screen
              name="Admin"
              component={AdminScreenn}
              options={{
                drawerIcon: ({focused}) => <IconWithBadge name='user-lock' size={25} color={focused ? '#FFF' : '#DDD'} badgeCount={pendingUsers?.length}/>
              }}
            />
        )}

        <AppDrawer.Screen
          name="Avisos"

          component={QRCode}
          options={{
            drawerIcon: ({focused}) => <IconWithBadge name='qrcode' size={25} color={focused ? '#FFF' : '#DDD'}/>
          }}
        />
      </AppDrawer.Navigator>
  );
}

export default AppRoutes;
