import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

/** PAGES */
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Forget from '../pages/Forget';

const AuthStack = createStackNavigator();

function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: '#3A3738',
            borderBottomWidth: 1,
            borderColor: '#2193F3',
          },
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerTitle: 'Voltar',
        }}
      />
      <AuthStack.Screen
        name="Forget"
        component={Forget}
        options={{
          headerStyle: {
            backgroundColor: '#3A3738',
            borderBottomWidth: 1,
            borderColor: '#2193F3',
          },
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerTitle: 'Voltar',
        }}
      />
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;
