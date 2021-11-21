import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import axios from 'axios';
import {AuthNavigationProps} from '../navigation/Routes';
import {API_List} from '../API/apiList';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import {CommonActions} from '@react-navigation/routers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalLoad from '../components/ModalLoad';
import TextInputField from '../components/TextInputField';
import {useForm} from 'react-hook-form';
import {SignInSchema} from '../components/SchemaValidate';
import Button from '../components/Button';
import TextNavigation from '../components/TextNavigation';

const LoginScreen = ({navigation}: AuthNavigationProps<'Login'>) => {
  const [isVisibleLoad, setVisibleLoad] = useState<boolean>(false);

  interface SignInDataProps {
    username: string;
    password: string;
  }

  const {control, handleSubmit} = useForm<SignInDataProps>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: SignInSchema,
  });

  const onSubmit = (data: SignInDataProps) => {
    setVisibleLoad(true);
    axios
      .post(API_List.login, data)
      .then(response => {
        const id = JSON.stringify(response.data.id);
        AsyncStorage.setItem('token', response.data.accessToken);
        AsyncStorage.setItem('username', response.data.username);
        AsyncStorage.setItem('userID', id);
        AsyncStorage.setItem('name', response.data.fullname);
        AsyncStorage.setItem('phone', response.data.phone);
        AsyncStorage.setItem('role', response.data.roles[0]);
        setVisibleLoad(false);
      })
      .then(() =>
        navigation.dispatch(
          CommonActions.reset({index: 0, routes: [{name: 'Main'}]}),
        ),
      )
      .catch(() => {
        setVisibleLoad(false);
        Alert.alert('Error', 'Invalid username or password', [
          {
            text: 'OK',
            onPress: () => null,
            style: 'cancel',
          },
        ]);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtHead}>Sign In</Text>
      <Text style={[styles.txt, styles.txtDescribe]}>
        Enter your sign in details to access your account
      </Text>

      <TextInputField
        placeholder="Username"
        placeholderTextColor="#9FA5AA"
        multiline={false}
        controller={control}
        name="username"
      />
      <TextInputField
        placeholder="Password"
        placeholderTextColor="#9FA5AA"
        secureTextEntry={true}
        multiline={false}
        controller={control}
        name="password"
      />

      <Button
        activeOpacity={0.8}
        onPress={handleSubmit(onSubmit)}
        text="Sign In"
      />
      <TextNavigation
        text="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('Register')}
      />
      <ModalLoad isVisibleLoad={isVisibleLoad} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  txt: {
    margin: '1.5%',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },

  txtHead: {
    padding: '2%',
    fontSize: rf(2.8),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  txtDescribe: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#8B959E',
  },

  inputNew: {
    fontSize: rf(2),
    margin: '2%',
    width: '80%',
    color: '#4c4c4c',
  },

  row: {
    flexDirection: 'row',
    margin: '1.5%',
  },
});

export default LoginScreen;
