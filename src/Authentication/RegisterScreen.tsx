import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import axios from 'axios';
import {API_List} from '../API/apiList';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import {AuthNavigationProps} from '../navigation/Routes';
import {Picker} from '@react-native-picker/picker';
import showToastFail from '../components/ToastError';
import TextInputField from '../components/TextInputField';
import {useForm} from 'react-hook-form';
import {SignUpSchema} from '../components/SchemaValidate';
import Button from '../components/Button';
import TextNavigation from '../components/TextNavigation';

const LoginScreen = ({navigation}: AuthNavigationProps<'Register'>) => {
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
        showToastFail();
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.roll}>
        <Text style={styles.txtHead}>Sign Up</Text>
        <Text style={[styles.txt, styles.txtDescribe]}>
          Enter your sign up details to register your new account
        </Text>

        <TextInputField
          placeholder="Username"
          placeholderTextColor="#9FA5AA"
          multiline={false}
          controller={control}
          name="username"
        />
        <TextInputField
          placeholder="Email"
          placeholderTextColor="#9FA5AA"
          keyboardType="email-address"
          multiline={false}
          controller={control}
          name="email"
        />
        <TextInputField
          placeholder="Password"
          placeholderTextColor="#9FA5AA"
          secureTextEntry={true}
          multiline={false}
          controller={control}
          name="password"
        />
        <TextInputField
          placeholder="Firstname"
          placeholderTextColor="#9FA5AA"
          multiline={false}
          controller={control}
          name="firstname"
        />
        <TextInputField
          placeholder="Lastname"
          placeholderTextColor="#9FA5AA"
          multiline={false}
          controller={control}
          name="lastname"
        />
        <TextInputField
          placeholder="Phone"
          placeholderTextColor="#9FA5AA"
          keyboardType="phone-pad"
          multiline={false}
          controller={control}
          name="phone"
        />
        <TextInputField
          placeholder="Address"
          placeholderTextColor="#9FA5AA"
          multiline={false}
          controller={control}
          name="address"
        />
        <TextInputField
          placeholder="Age"
          placeholderTextColor="#9FA5AA"
          multiline={false}
          controller={control}
          maxLength={3}
          keyboardType="number-pad"
          name="age"
        />
        <Picker
          onValueChange={value => setSex(value)}
          selectedValue={sex}
          style={styles.pick}
          dropdownIconColor="#9FA5AA">
          <Picker.Item label="Choose gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        <Button
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  roll: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
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

  pick: {
    color: '#9FA5AA',
    textAlign: 'left',
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '80%',
    margin: '2%',
    paddingLeft: '4%',
  },
});

export default LoginScreen;
