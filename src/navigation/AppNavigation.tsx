import React from 'react';

import HomeScreen from '../AppFeature/HomeScreen';
import LocationScreen from '../AppFeature/LocationScreen';
import AdminScreen from '../AppFeature/AdminScreen';
import BMIScreen from '../AppFeature/BMIScreen';
import AppointmentScreen from '../AppFeature/AppointmentScreen';
import ProfileScreen from '../AppFeature/ProfileScreen';
import HealthAdvisorScreen from '../AppFeature/HealthAdvisorScreen';
import {AppRoutes} from '../navigation/Routes';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Drawer = createDrawerNavigator<AppRoutes>();

const CustomDrawerContent = props => {
  const {state, ...rest} = props;
  const newState = {...state};
  newState.routes = newState.routes.filter(item => item.name !== 'Profile');
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList state={newState} {...rest} />
    </DrawerContentScrollView>
  );
};

const AppNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          title: 'Dashboard',
          drawerIcon: () => <MaterialIcon name="dashboard" size={24} />,
        }}
      />
      <Drawer.Screen
        name={'Location'}
        component={LocationScreen}
        options={{
          title: 'Find Location',
          drawerIcon: () => <MaterialIcon name="location-on" size={24} />,
        }}
      />
      <Drawer.Screen
        name={'Appointment'}
        component={AppointmentScreen}
        initialParams={{token: '', role: ''}}
        options={{
          title: 'Appointment',
          drawerIcon: () => <FontAwesome name="calendar-plus-o" size={24} />,
        }}
      />
      <Drawer.Screen
        name={'HealthAdvisor'}
        component={HealthAdvisorScreen}
        initialParams={{token: '', name: '', role: ''}}
        options={{
          title: 'Health Advisor',
          drawerIcon: () => <MaterialIcon name="question-answer" size={24} />,
        }}
      />
      <Drawer.Screen
        name={'BMI'}
        component={BMIScreen}
        options={{
          title: 'BMI Calculation',
          drawerIcon: () => <FontAwesome5 name="weight" size={24} />,
        }}
      />
      <Drawer.Screen
        name={'Admin'}
        component={AdminScreen}
        options={{
          title: 'For Admin',
          drawerIcon: () => (
            <MaterialIcon name="admin-panel-settings" size={24} />
          ),
        }}
      />
      <Drawer.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{gestureEnabled: false}}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigation;
