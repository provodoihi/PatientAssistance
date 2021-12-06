import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {AuthNavigationProps} from '../../navigation/Routes';
import {useForm} from 'react-hook-form';
import {
  Button,
  SignUpSchema,
  TextInputField,
  TextNavigation,
  showToastLong,
  PickerControlled,
} from '../../components';
import {useStores, SignUpDataType} from '../../models';
import {styleRegisterScreen as style} from './style';

export const RegisterScreen = ({
  navigation,
}: AuthNavigationProps<'Register'>) => {
  const role: string[] = ['patient'];

  const {authStore} = useStores();

  const {control, handleSubmit} = useForm<SignUpDataType>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      phone: '',
      address: '',
      age: '',
      sex: '',
    },
    resolver: SignUpSchema,
  });

  const onSubmitRegister = async (data: SignUpDataType) => {
    try {
      let signUpData = {...data, role};
      await authStore.register(signUpData);
      navigation.navigate('SignupSuccess');
    } catch (error: any) {
      showToastLong(error.response.data.message);
    }
  };

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={style.srollView}>
        <Text style={[style.textAlignCenter, style.textBigBoldBlack]}>
          Sign Up
        </Text>
        <Text style={[style.textAlignCenter, style.textNormalGray]}>
          Enter your sign up details to register your new account
        </Text>

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
          placeholder="Email"
          placeholderTextColor="#9FA5AA"
          keyboardType="email-address"
          multiline={false}
          controller={control}
          name="email"
          label="Email"
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
        />
        <TextInputField
          placeholder="Firstname"
          placeholderTextColor="#9FA5AA"
          multiline={false}
          controller={control}
          name="firstname"
          label="Firstname"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Lastname"
          placeholderTextColor="#9FA5AA"
          multiline={false}
          controller={control}
          name="lastname"
          label="Lastname"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Phone"
          placeholderTextColor="#9FA5AA"
          keyboardType="phone-pad"
          multiline={false}
          controller={control}
          name="phone"
          label="Phone Number"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Address"
          placeholderTextColor="#9FA5AA"
          multiline={false}
          controller={control}
          name="address"
          label="Address"
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
          label="Age"
          isErrorField={true}
        />
        <PickerControlled
          name="sex"
          placeholder="Choose gender"
          data={['Male', 'Female', 'Other']}
          label="Gender"
          dropdownIconColor="#9FA5AA"
          controller={control}
          isErrorField={true}
        />
        <Button
          style={[style.buttonBlue, style.shadowBlue]}
          textStyle={[style.textAlignCenter, style.textBigBoldWhite]}
          activeOpacity={0.8}
          onPress={handleSubmit(onSubmitRegister)}
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
