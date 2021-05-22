import React from 'react';

import WelcomeScreen from '../Authentication/WelcomeScreen';
import LoginScreen from '../Authentication/LoginScreen';
import RegisterScreen from '../Authentication/RegisterScreen';
import SignupSuccessScreen from '../Authentication/SignupSuccessScreen';
import {AuthRoutes} from '../navigation/Routes';
import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator<AuthRoutes>();

const AuthNavigation = () => {
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
