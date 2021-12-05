import React, {useEffect, useState} from 'react';

import AuthNavigation from './src/navigation/AuthNavigation';
import AppNavigation from './src/navigation/AppNavigation';
import {MainRoutes} from './src/navigation/Routes';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {setupRootStore, RootStore, RootStoreProvider} from './src/models';

const Stack = createStackNavigator<MainRoutes>();

const App = () => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);
  useEffect(() => {
    SplashScreen.hide();
  });
  useEffect(() => {
    setupRootStore().then(setRootStore);
  }, []);
  if (!rootStore) {
    return null;
  }
  return (
    <RootStoreProvider value={rootStore}>
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
    </RootStoreProvider>
  );
};

export default App;
