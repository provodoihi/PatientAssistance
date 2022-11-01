import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';

export type MainRoutes = {
  Auth: undefined;
  Main: undefined;
};

export type AuthRoutes = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  SignupSuccess: undefined;
};

export type AppRoutes = {
  Home: undefined;
  Location: undefined;
  HealthAdvisor: {token: string; name: string; role: string};
  Admin: {token: string; name: string; role: string; userID: string | number};
  Clinic: {token: string; name: string; role: string; userID: string | number};
  Advisor: {token: string; name: string; role: string; userID: string | number};
  BMI: undefined;
  Appointment: undefined;
  Profile: undefined;
  QAList: {token: string};
  AppointmentList: undefined;
  AdvisorQuestionList: {token: string};
  AdvisorAnswer: {token: string};
  AdvisorAnswerList: {token: string};
  ClinicAppointmentList: {token: string; userID: string | number};
  ClinicAppointmentManage: {token: string; userID: string | number};
  AdminUserManage: {token: string};
  AdminAppointmentManage: {token: string};
  AdminAdvisorManage: {token: string};
  AdminLocationManage: {token: string};
  MapView: {name: string; latitude: number; longitude: number};
  AdminLocationAdd: {token: string};
  AdminLocationSearch: {token: string};
  AdminLocationEdit: {token: string};
  AdminQuestionManage: {token: string};
  AdminAnswerManage: {token: string};
  AdminUserFind: {token: string};
  AdminUserEdit: {token: string};
  AdminUserDelete: {token: string};
};

export type AuthNavigationProps<RouteName extends keyof AuthRoutes> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthRoutes, RouteName>,
    DrawerScreenProps<AppRoutes, 'Home'>
  >;

export type AppNavigationProps<RouteName extends keyof AppRoutes> =
  DrawerScreenProps<AppRoutes, RouteName>;
