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
  Admin: undefined;
  Signout: undefined;
  Appointment: undefined;
  Profile: undefined;
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
