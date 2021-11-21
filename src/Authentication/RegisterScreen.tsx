import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {API_List} from '../API/apiList';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import {AuthNavigationProps} from '../navigation/Routes';
import {Picker} from '@react-native-picker/picker';
import showToastFail from '../components/ToastError';
import TextInputField from '../components/TextInputField';
import {useForm} from 'react-hook-form';
import {SignUpSchema} from '../components/SchemaValidate';

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
        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          activeOpacity={0.8}
          onPress={handleSubmit(onSubmit)}>
          <Text style={[styles.txt, styles.txtButton]}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.txt, styles.txtNavigate]}>
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
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

  img: {
    margin: 15,
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

  pick: {
    color: '#9FA5AA',
    textAlign: 'left',
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '80%',
    margin: '2%',
    paddingLeft: '4%',
  },

  button: {
    backgroundColor: '#00BFFF',
    margin: '3%',
    borderRadius: 25,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
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
