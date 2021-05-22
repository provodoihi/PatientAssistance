import React, {useEffect} from 'react';

import AuthNavigation from './src/navigation/AuthNavigation';
import AppNavigation from './src/navigation/AppNavigation';
import {MainRoutes} from './src/navigation/Routes';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator<MainRoutes>();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={AppNavigation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
