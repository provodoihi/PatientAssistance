import React, {useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import axios from 'axios';
import {API_List} from '../API';
import {AuthNavigationProps} from '../navigation/Routes';
import {Picker} from '@react-native-picker/picker';
import {useForm} from 'react-hook-form';
import {
  Button,
  SignUpSchema,
  TextInputField,
  TextNavigation,
  showToast,
} from '../components';
import {authScreenStyle as style} from './style';

export const RegisterScreen = ({
  navigation,
}: AuthNavigationProps<'Register'>) => {
  const [sex, setSex] = useState<String>('');
  const role: string[] = ['patient'];
  interface SignUpDataProps {
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    address: string;
    age: string | number;
  }

  const {control, handleSubmit} = useForm<SignUpDataProps>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      phone: '',
      address: '',
      age: '',
    },
    resolver: SignUpSchema,
  });

  const onSubmit = (data: SignUpDataProps) => {
    let signUpData = {...data, sex, role};
    axios
      .post(API_List.signup, signUpData)
      .then(() => navigation.navigate('SignupSuccess'))
      .catch(() => {
        showToast('Something went wrong');
      });
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={style.container}>
        <Text style={[style.txt, style.txtHeading]}>Sign Up</Text>
        <Text style={[style.txt, style.txtDescription]}>
          Enter your sign up details to register your new account
        </Text>

        <TextInputField
          placeholder="Username"
          placeholderTextColor="#9FA5AA"
          multiline={false}
          controller={control}
          name="username"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Email"
          placeholderTextColor="#9FA5AA"
          keyboardType="email-address"
          multiline={false}
          controller={control}
          name="email"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Password"
          placeholderTextColor="#9FA5AA"
          secureTextEntry={true}
          multiline={false}
          controller={control}
          name="password"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Firstname"
          placeholderTextColor="#9FA5AA"
          multiline={false}
          controller={control}
          name="firstname"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Lastname"
          placeholderTextColor="#9FA5AA"
          multiline={false}
          controller={control}
          name="lastname"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Phone"
          placeholderTextColor="#9FA5AA"
          keyboardType="phone-pad"
          multiline={false}
          controller={control}
          name="phone"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Address"
          placeholderTextColor="#9FA5AA"
          multiline={false}
          controller={control}
          name="address"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Age"
          placeholderTextColor="#9FA5AA"
          multiline={false}
          controller={control}
          maxLength={3}
          keyboardType="number-pad"
          name="age"
          isErrorField={true}
        />
        <Picker
          onValueChange={value => setSex(value)}
          selectedValue={sex}
          style={style.picker}
          dropdownIconColor="#9FA5AA">
          <Picker.Item label="Choose gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        <Button
          style={[style.button, style.buttonShadow]}
          textStyle={style.txtButton}
          activeOpacity={0.8}
          onPress={handleSubmit(onSubmit)}
          text="Sign Up"
        />
        <TextNavigation
          text="Already have an account? Sign In"
          onPress={() => navigation.navigate('Login')}
        />
      </ScrollView>
    </View>
  );
};
