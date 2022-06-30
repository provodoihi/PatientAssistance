import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {AuthNavigationProps} from '../../navigation/routes';
import {useForm} from 'react-hook-form';
import {
  Button,
  SignUpSchema,
  TextInputField,
  TextNavigation,
  showToastLong,
  PickerControlled,
} from '../../components';
import {GENDER, palette} from '../../utils';
import {useStores, SignUpDataType} from '../../models';
import {styles} from './styles';

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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.srollView}>
        <Text style={[styles.textAlignCenter, styles.textBigBoldBlack]}>
          Sign Up
        </Text>
        <Text style={[styles.textAlignCenter, styles.textNormalGray]}>
          Enter your sign up details to register your new account
        </Text>

        <TextInputField
          placeholder="Username"
          placeholderTextColor={palette.lightGrey}
          multiline={false}
          controller={control}
          name="username"
          label="Username"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Email"
          placeholderTextColor={palette.lightGrey}
          keyboardType="email-address"
          multiline={false}
          controller={control}
          name="email"
          label="Email"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Password"
          placeholderTextColor={palette.lightGrey}
          secureTextEntry={true}
          multiline={false}
          controller={control}
          name="password"
          label="Password"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Firstname"
          placeholderTextColor={palette.lightGrey}
          multiline={false}
          controller={control}
          name="firstname"
          label="Firstname"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Lastname"
          placeholderTextColor={palette.lightGrey}
          multiline={false}
          controller={control}
          name="lastname"
          label="Lastname"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Phone"
          placeholderTextColor={palette.lightGrey}
          keyboardType="phone-pad"
          multiline={false}
          controller={control}
          name="phone"
          label="Phone Number"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Address"
          placeholderTextColor={palette.lightGrey}
          multiline={false}
          controller={control}
          name="address"
          label="Address"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Age"
          placeholderTextColor={palette.lightGrey}
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
          data={GENDER}
          label="Gender"
          dropdownIconColor={palette.lightGrey}
          controller={control}
          isErrorField={true}
        />
        <Button
          style={[styles.buttonBlue, styles.shadowBlue]}
          textStyle={[styles.textAlignCenter, styles.textBigBoldWhite]}
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
