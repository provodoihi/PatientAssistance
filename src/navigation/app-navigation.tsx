import React from 'react';

// import screen
import {
  HomeScreen,
  LocationScreen,
  BMIScreen,
  ProfileScreen,
  MapViewScreen,
} from '../app-feature/common';
import AdvisorQuestionListScreen from '../app-feature/advisor/AdvisorQuestionListScreen';
import AdvisorAnswerScreen from '../app-feature/advisor/AdvisorAnswerScreen';
import AdvisorAnswerListScreen from '../app-feature/advisor/AdvisorAnswerList';
import ClinicAppointmentListScreen from '../app-feature/clinic/ClinicAppointmentList';
import ClinicAppointmentManageScreen from '../app-feature/clinic/ClinicAppointmentManageScreen';
import AdminUserManageScreen from '../app-feature/admin/AdminUserManageScreen';
import AdminAppointmentManageScreen from '../app-feature/admin/AdminAppointmentManageScreen';
import AdminAdvisorManageScreen from '../app-feature/admin/AdminAdvisorManageScreen';
import AdminLocationManageScreen from '../app-feature/admin/AdminLocationManageScreen';
import AdminSearchLocationScreen from '../app-feature/admin/LocationManage/AdminSearchLocation';
import AdminLocationAddScreen from '../app-feature/admin/LocationManage/AdminAddLocation';
import AdminLocationEditScreen from '../app-feature/admin/LocationManage/AdminEditLocation';
import AdminQuestionManageScreen from '../app-feature/admin/AdvisorManage/AdminQuestionManage';
import AdminAnswerManageScreen from '../app-feature/admin/AdvisorManage/AdminAnswerManage';
import AdminListUserScreen from '../app-feature/admin/UserManage/AdminListUser';
import AdminEditUserScreen from '../app-feature/admin/UserManage/AdminEditUser';
import AdminDeleteUserScreen from '../app-feature/admin/UserManage/AdminDeleteUser';

// other import
import {AppRoutes} from './routes';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ClinicScreen from '../app-feature/clinic/ClinicScreen';
import AdvisorScreen from '../app-feature/advisor/AdvisorScreen';
import AdminScreen from '../app-feature/admin/AdminScreen';
import {
  AppointmentScreen,
  AppointmentListScreen,
  HealthAdvisorListScreen,
  HealthAdvisorScreen,
} from '../app-feature/patient';
const Drawer = createDrawerNavigator<AppRoutes>();

type Item = {
  name: string;
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {state, ...rest} = props;
  const newState = {...state};
  // filter the screen not to show in drawer menu
  newState.routes = newState.routes.filter(
    (item: Item) =>
      item.name !== 'Profile' &&
      item.name !== 'QAList' &&
      item.name !== 'MapView' &&
      item.name !== 'Admin' &&
      item.name !== 'Clinic' &&
      item.name !== 'Advisor' &&
      item.name !== 'AppointmentList' &&
      item.name !== 'AdvisorQuestionList' &&
      item.name !== 'AdvisorAnswer' &&
      item.name !== 'AdvisorAnswerList' &&
      item.name !== 'ClinicAppointmentList' &&
      item.name !== 'ClinicAppointmentManage' &&
      item.name !== 'AdminUserManage' &&
      item.name !== 'AdminAppointmentManage' &&
      item.name !== 'AdminAdvisorManage' &&
      item.name !== 'AdminLocationManage' &&
      item.name !== 'AdminLocationSearch' &&
      item.name !== 'AdminLocationAdd' &&
      item.name !== 'AdminLocationEdit' &&
      item.name !== 'AdminQuestionManage' &&
      item.name !== 'AdminAnswerManage' &&
      item.name !== 'AdminUserFind' &&
      item.name !== 'AdminUserEdit' &&
      item.name !== 'AdminUserDelete',
  );
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList state={newState} {...rest} />
    </DrawerContentScrollView>
  );
};

export const AppNavigation = () => {
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
        // initialParams={{token: '', role: ''}}
        options={{
          title: 'Appointment',
          drawerIcon: () => <FontAwesome name="calendar-plus-o" size={24} />,
        }}
      />
      <Drawer.Screen
        name={'Admin'}
        component={AdminScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'Clinic'}
        component={ClinicScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'Advisor'}
        component={AdvisorScreen}
        options={{swipeEnabled: false}}
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
        name={'Profile'}
        component={ProfileScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'MapView'}
        component={MapViewScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'QAList'}
        component={HealthAdvisorListScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AppointmentList'}
        component={AppointmentListScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AdvisorQuestionList'}
        component={AdvisorQuestionListScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AdvisorAnswer'}
        component={AdvisorAnswerScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AdvisorAnswerList'}
        component={AdvisorAnswerListScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'ClinicAppointmentList'}
        component={ClinicAppointmentListScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'ClinicAppointmentManage'}
        component={ClinicAppointmentManageScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminUserManage'}
        component={AdminUserManageScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminAppointmentManage'}
        component={AdminAppointmentManageScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminAdvisorManage'}
        component={AdminAdvisorManageScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminLocationManage'}
        component={AdminLocationManageScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminLocationSearch'}
        component={AdminSearchLocationScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminLocationAdd'}
        component={AdminLocationAddScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminLocationEdit'}
        component={AdminLocationEditScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminQuestionManage'}
        component={AdminQuestionManageScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminAnswerManage'}
        component={AdminAnswerManageScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminUserFind'}
        component={AdminListUserScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminUserEdit'}
        component={AdminEditUserScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminUserDelete'}
        component={AdminDeleteUserScreen}
        options={{swipeEnabled: false}}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigation;
