import React from 'react';
import {
  WelcomeScreen,
  LoginScreen,
  RegisterScreen,
  SignupSuccessScreen,
} from '../Authentication';
import {AuthRoutes} from './routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator<AuthRoutes>();

export const AuthNavigation = () => {
  return (
    <AuthStack.Navigator initialRouteName={'Welcome'}>
      <AuthStack.Screen
        name={'Welcome'}
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={'Login'}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={'Register'}
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={'SignupSuccess'}
        component={SignupSuccessScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
