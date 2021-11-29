import React from 'react';

// import screen
import {
  HomeScreen,
  LocationScreen,
  BMIScreen,
  ProfileScreen,
  MapViewScreen,
} from '../AppFeature/Common';
import HealthAdvisorScreen from '../AppFeature/Patient/HealthAdvisorScreen';
import HealthAdvisorListScreen from '../AppFeature/Patient/HealthAdvisorList';
import AppointmentListScreen from '../AppFeature/Patient/Appointment/AppointmentList/AppointmentList';
import AdvisorQuestionListScreen from '../AppFeature/Advisor/AdvisorQuestionListScreen';
import AdvisorAnswerScreen from '../AppFeature/Advisor/AdvisorAnswerScreen';
import AdvisorAnswerListScreen from '../AppFeature/Advisor/AdvisorAnswerList';
import ClinicAppointmentListScreen from '../AppFeature/Clinic/ClinicAppointmentList';
import ClinicAppointmentManageScreen from '../AppFeature/Clinic/ClinicAppointmentManageScreen';
import AdminUserManageScreen from '../AppFeature/Admin/AdminUserManageScreen';
import AdminAppointmentManageScreen from '../AppFeature/Admin/AdminAppointmentManageScreen';
import AdminAdvisorManageScreen from '../AppFeature/Admin/AdminAdvisorManageScreen';
import AdminLocationManageScreen from '../AppFeature/Admin/AdminLocationManageScreen';
import AdminSearchLocationScreen from '../AppFeature/Admin/LocationManage/AdminSearchLocation';
import AdminLocationAddScreen from '../AppFeature/Admin/LocationManage/AdminAddLocation';
import AdminLocationEditScreen from '../AppFeature/Admin/LocationManage/AdminEditLocation';
import AdminQuestionManageScreen from '../AppFeature/Admin/AdvisorManage/AdminQuestionManage';
import AdminAnswerManageScreen from '../AppFeature/Admin/AdvisorManage/AdminAnswerManage';
import AdminListUserScreen from '../AppFeature/Admin/UserManage/AdminListUser';
import AdminEditUserScreen from '../AppFeature/Admin/UserManage/AdminEditUser';
import AdminDeleteUserScreen from '../AppFeature/Admin/UserManage/AdminDeleteUser';

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
import ClinicScreen from '../AppFeature/Clinic/ClinicScreen';
import AdvisorScreen from '../AppFeature/Advisor/AdvisorScreen';
import AdminScreen from '../AppFeature/Admin/AdminScreen';
import AppointmentScreen from '../AppFeature/Patient/Appointment/AppointmentBooking/AppointmentScreen';
const Drawer = createDrawerNavigator<AppRoutes>();

type Item = {
  name: string;
};

const CustomDrawerContent = (props: any) => {
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
        initialParams={{token: '', role: ''}}
        options={{
          title: 'Appointment',
          drawerIcon: () => <FontAwesome name="calendar-plus-o" size={24} />,
        }}
      />
      <Drawer.Screen
        name={'Admin'}
        component={AdminScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'Clinic'}
        component={ClinicScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'Advisor'}
        component={AdvisorScreen}
        options={{gestureEnabled: false}}
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
      <Drawer.Screen
        name={'AdminLocationSearch'}
        component={AdminSearchLocationScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminLocationAdd'}
        component={AdminLocationAddScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminLocationEdit'}
        component={AdminLocationEditScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminQuestionManage'}
        component={AdminQuestionManageScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminAnswerManage'}
        component={AdminAnswerManageScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminUserFind'}
        component={AdminListUserScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminUserEdit'}
        component={AdminEditUserScreen}
        options={{gestureEnabled: false}}
      />
      <Drawer.Screen
        name={'AdminUserDelete'}
        component={AdminDeleteUserScreen}
        options={{gestureEnabled: false}}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigation;
