import React, {useState} from 'react';
import {Text, View, Alert} from 'react-native';
import axios from 'axios';
import {AuthNavigationProps} from '../../navigation/Routes';
import {API_List} from '../../API';
import {CommonActions} from '@react-navigation/routers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm} from 'react-hook-form';
import {
  Button,
  SignInSchema,
  ModalLoad,
  TextNavigation,
  TextInputField,
} from '../../components';
import {styleLoginScreen as style} from './style';

export const LoginScreen = ({navigation}: AuthNavigationProps<'Login'>) => {
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
    <View style={style.container}>
      <Text style={[style.textAlignCenter, style.textBigBoldBlack]}>
        Sign In
      </Text>
      <Text style={[style.textAlignCenter, style.textNormalGray]}>
        Enter your sign in details to access your account
      </Text>
      <ModalLoad isVisibleLoad={isVisibleLoad} />

      <TextInputField
        placeholder="Username"
        placeholderTextColor="#9FA5AA"
        multiline={false}
        controller={control}
        name="username"
        label="Username"
        isErrorField={true}
      />
      <TextInputField
        placeholder="Password"
        placeholderTextColor="#9FA5AA"
        secureTextEntry={true}
        multiline={false}
        controller={control}
        name="password"
        label="Password"
        isErrorField={true}
        onSubmitEditing={handleSubmit(onSubmit)}
      />

      <Button
        style={[style.buttonBlue, style.shadowBlue]}
        textStyle={[style.textAlignCenter, style.textBigBoldWhite]}
        activeOpacity={0.8}
        onPress={handleSubmit(onSubmit)}
        text="Sign In"
      />
      <TextNavigation
        text="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};
