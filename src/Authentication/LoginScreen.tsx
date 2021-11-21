import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
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

      <TouchableOpacity
        style={[styles.button, styles.shadow]}
        activeOpacity={0.8}
        onPress={handleSubmit(onSubmit)}>
        <Text style={[styles.txt, styles.txtButton]}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.txt, styles.txtNavigate]}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
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

  txtNavigate: {
    padding: '1.5%',
    fontSize: rf(1.8),
    fontWeight: 'normal',
    color: '#00BFFF',
  },

  txtDescribe: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#8B959E',
  },

  txtButton: {
    fontSize: rf(2.6),
    padding: '2.5%',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  inputNew: {
    fontSize: rf(2),
    margin: '2%',
    width: '80%',
    color: '#4c4c4c',
  },

  button: {
    backgroundColor: '#00BFFF',
    margin: '3%',
    borderRadius: 25,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    margin: '1.5%',
  },

  shadow: {
    shadowColor: '#00BFFF',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
});

export default LoginScreen;
