import { MapView } from 'react-native-maps';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';

export type MainRoutes = {
  Auth: undefined;
  Main: undefined;
};

export type AuthRoutes = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  SignupSuccess: undefined;
};

export type AppRoutes = {
  Home: undefined;
  Location: undefined;
  HealthAdvisor: {token: string; name: string; role: string};
  Admin: undefined;
  Clinic: undefined;
  Advisor: undefined;
  BMI: undefined;
  Appointment: {token: string; name: string; role: string};
  Profile: {token: string; name: string; role: string};
  QAList: {token: string};
  AppointmentList: {token: string; userID: string};
  AdvisorQuestionList: {token: string};
  AdvisorAnswer: {token: string};
  AdvisorAnswerList: {token: string};
  ClinicAppointmentList: {token: string; userID: string};
  ClinicAppointmentManage: {token: string; userID: string};
  AdminUserManage: {token: string};
  AdminAppointmentManage: {token: string};
  AdminAdvisorManage: {token: string};
  AdminLocationManage: {token: string};
  MapView: {name: string; latitude: number; longtitude: number};
};

export interface AuthNavigationProps<RouteName extends keyof AuthRoutes> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthRoutes, RouteName>,
    DrawerNavigationProp<AppRoutes, 'Home'>
  >;
  route: RouteProp<AuthRoutes, RouteName>;
}

export interface AppNavigationProps<RouteName extends keyof AppRoutes> {
  navigation: DrawerNavigationProp<AppRoutes, RouteName>;
  route: RouteProp<AppRoutes, RouteName>;
}
