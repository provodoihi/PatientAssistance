import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {AuthNavigationProps} from '../../navigation/routes';
import {useForm} from 'react-hook-form';
import {
  Button,
  TextInputField,
  TextNavigation,
  showToastLong,
  PickerControlled,
} from '../../components';
import {useTranslation} from 'react-i18next';
import {GENDER, palette, SignUpSchema} from '../../utils';
import {useStores, SignUpDataType} from '../../models';
import {styles} from './styles';

export const RegisterScreen = ({
  navigation,
}: AuthNavigationProps<'Register'>) => {
  const role: string[] = ['patient'];
  const {t} = useTranslation();
  const {authStore} = useStores();

  const {control, handleSubmit, getValues} = useForm<SignUpDataType>({
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

  const isDisabled =
    !getValues('username') &&
    !getValues('password') &&
    !getValues('email') &&
    !getValues('address') &&
    !getValues('age') &&
    !getValues('firstname') &&
    !getValues('lastname') &&
    !getValues('phone') &&
    !getValues('sex');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.srollView}>
        <Text style={[styles.textAlignCenter, styles.textBigBoldBlack]}>
          {t('signUpScreen.signUp')}
        </Text>
        <Text style={[styles.textAlignCenter, styles.textNormalGray]}>
          {t('signUpScreen.enterSignUpDetails')}
        </Text>

        <TextInputField
          placeholder={t('common.username')}
          placeholderTextColor={palette.lightGrey}
          multiline={false}
          controller={control}
          name="username"
          label={t('common.username')}
          isErrorField={true}
        />
        <TextInputField
          placeholder={t('common.email')}
          placeholderTextColor={palette.lightGrey}
          keyboardType="email-address"
          multiline={false}
          controller={control}
          name="email"
          label={t('common.email')}
          isErrorField={true}
        />
        <TextInputField
          placeholder={t('common.password')}
          placeholderTextColor={palette.lightGrey}
          secureTextEntry={true}
          multiline={false}
          controller={control}
          name="password"
          label={t('common.password')}
          isErrorField={true}
        />
        <TextInputField
          placeholder={t('common.firstname')}
          placeholderTextColor={palette.lightGrey}
          multiline={false}
          controller={control}
          name="firstname"
          label={t('common.firstname')}
          isErrorField={true}
        />
        <TextInputField
          placeholder={t('common.lastname')}
          placeholderTextColor={palette.lightGrey}
          multiline={false}
          controller={control}
          name="lastname"
          label={t('common.lastname')}
          isErrorField={true}
        />
        <TextInputField
          placeholder={t('common.phoneNumber')}
          placeholderTextColor={palette.lightGrey}
          keyboardType="phone-pad"
          multiline={false}
          controller={control}
          name="phone"
          label={t('common.phoneNumber')}
          isErrorField={true}
        />
        <TextInputField
          placeholder={t('common.address')}
          placeholderTextColor={palette.lightGrey}
          multiline={false}
          controller={control}
          name="address"
          label={t('common.address')}
          isErrorField={true}
        />
        <TextInputField
          placeholder={t('common.age')}
          placeholderTextColor={palette.lightGrey}
          multiline={false}
          controller={control}
          maxLength={3}
          keyboardType="number-pad"
          name="age"
          label={t('common.age')}
          isErrorField={true}
        />
        <PickerControlled
          name="sex"
          placeholder={t('common.chooseGender')}
          data={GENDER}
          label={t('common.gender')}
          dropdownIconColor={palette.lightGrey}
          controller={control}
          isErrorField={true}
        />
        <Button
          style={[styles.buttonBlue, styles.shadowBlue]}
          textStyle={[styles.textAlignCenter, styles.textBigBoldWhite]}
          activeOpacity={0.8}
          disabled={isDisabled}
          onPress={handleSubmit(onSubmitRegister)}
          text="Sign Up"
        />
        <TextNavigation
          text={t('common.alreadyHasAccount')}
          onPress={() => navigation.navigate('Login')}
        />
      </ScrollView>
    </View>
  );
};
