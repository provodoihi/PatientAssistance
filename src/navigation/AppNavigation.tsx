import React from 'react';

import HomeScreen from '../AppFeature/HomeScreen';
import LocationScreen from '../AppFeature/LocationScreen';
import AdminScreen from '../AppFeature/AdminScreen';
import Signout from '../AppFeature/Signout';
import AppointmentScreen from '../AppFeature/AppointmentScreen';
import ProfileScreen from '../AppFeature/ProfileScreen';
import {AppRoutes} from '../navigation/Routes';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator<AppRoutes>();

const AppNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName={'Home'}>
      <Drawer.Screen name={'Home'} component={HomeScreen} />
      <Drawer.Screen name={'Location'} component={LocationScreen} />
      <Drawer.Screen name={'Appointment'} component={AppointmentScreen} />
      <Drawer.Screen name={'Admin'} component={AdminScreen} />
      <Drawer.Screen name={'Profile'} component={ProfileScreen} />
      <Drawer.Screen name={'Signout'} component={Signout} />
    </Drawer.Navigator>
  );
};

export default AppNavigation;
