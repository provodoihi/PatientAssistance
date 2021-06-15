import React from 'react';

// import
import HomeScreen from '../AppFeature/Common/HomeScreen';
import LocationScreen from '../AppFeature/Common/LocationScreen';
import AdminScreen from '../AppFeature/Admin/AdminScreen';
import BMIScreen from '../AppFeature/Common/BMIScreen';
import AppointmentScreen from '../AppFeature/Patient/AppointmentScreen';
import ProfileScreen from '../AppFeature/Common/ProfileScreen';
import HealthAdvisorScreen from '../AppFeature/Patient/HealthAdvisorScreen';
import HealthAdvisorListScreen from '../AppFeature/Patient/HealthAdvisorList';
import AppointmentListScreen from '../AppFeature/Patient/AppointmentList';
import ClinicScreen from '../AppFeature/Clinic/ClinicScreen';
import AdvisorScreen from '../AppFeature/Advisor/AdvisorScreen';
import AdvisorQuestionListScreen from '../AppFeature/Advisor/AdvisorQuestionListScreen';
import AdvisorAnswerScreen from '../AppFeature/Advisor/AdvisorAnswerScreen';
import AdvisorAnswerListScreen from '../AppFeature/Advisor/AdvisorAnswerList';
import ClinicAppointmentListScreen from '../AppFeature/Clinic/ClinicAppointmentList';
import ClinicAppointmentManageScreen from '../AppFeature/Clinic/ClinicAppointmentManageScreen';
import AdminUserManageScreen from '../AppFeature/Admin/AdminUserManageScreen';
import AdminAppointmentManageScreen from '../AppFeature/Admin/AdminAppointmentManageScreen';
import AdminAdvisorManageScreen from '../AppFeature/Admin/AdminAdvisorManageScreen';
import AdminLocationManageScreen from '../AppFeature/Admin/AdminLocationManageScreen';
import MapViewScreen from '../AppFeature/Common/MapViewScreen';

// other import
import {AppRoutes} from '../navigation/Routes';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Drawer = createDrawerNavigator<AppRoutes>();

const CustomDrawerContent = props => {
  const {state, ...rest} = props;
  const newState = {...state};
  // filter the screen to not showing in drawer menu
  newState.routes = newState.routes.filter(
    item =>
      item.name !== 'Profile' &&
      item.name !== 'QAList' &&
      item.name !== 'MapView' &&
      item.name !== 'AppointmentList' &&
      item.name !== 'AdvisorQuestionList' &&
      item.name !== 'AdvisorAnswer' &&
      item.name !== 'AdvisorAnswerList' &&
      item.name !== 'ClinicAppointmentList' &&
      item.name !== 'ClinicAppointmentManage' &&
      item.name !== 'AdminUserManage' &&
      item.name !== 'AdminAppointmentManage' &&
      item.name !== 'AdminAdvisorManage' &&
      item.name !== 'AdminLocationManage',
  );
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
        name={'Clinic'}
        component={ClinicScreen}
        options={{
          title: 'For Clinic',
          drawerIcon: () => <FontAwesome5 name="clinic-medical" size={24} />,
        }}
      />
      <Drawer.Screen
        name={'Advisor'}
        component={AdvisorScreen}
        options={{
          title: 'For Advisor',
          drawerIcon: () => <MaterialCommunityIcons name="doctor" size={24} />,
        }}
      />
      <Drawer.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'MapView'}
        component={MapViewScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'QAList'}
        component={HealthAdvisorListScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'AppointmentList'}
        component={AppointmentListScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'AdvisorQuestionList'}
        component={AdvisorQuestionListScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'AdvisorAnswer'}
        component={AdvisorAnswerScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'AdvisorAnswerList'}
        component={AdvisorAnswerListScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'ClinicAppointmentList'}
        component={ClinicAppointmentListScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'ClinicAppointmentManage'}
        component={ClinicAppointmentManageScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminUserManage'}
        component={AdminUserManageScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminAppointmentManage'}
        component={AdminAppointmentManageScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminAdvisorManage'}
        component={AdminAdvisorManageScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminLocationManage'}
        component={AdminLocationManageScreen}
        options={{gestureEnabled: false}}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigation;
