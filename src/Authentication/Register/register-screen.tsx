import React, {useRef, useState} from 'react';
import {Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthNavigationProps} from '../../navigation/routes';
import {useForm} from 'react-hook-form';
import {
  Button,
  TextInputField,
  TextNavigation,
  // CustomPickerControlled,
  ToastMessage,
  PickerWithTicker,
} from '../../components';
import {useTranslation} from 'react-i18next';
import {GENDER, palette, SignUpSchema, isIOS} from '../../utils';
import {useStores, SignUpDataType} from '../../models';
import {styles} from './styles';

export const RegisterScreen = ({
  navigation,
}: AuthNavigationProps<'Register'>) => {
  const [selectedValue, setSelectedValue] = useState<string>(null);
  const role: string[] = ['patient'];
  const {t} = useTranslation();
  const {authStore} = useStores();
  const toastMessage = useRef<ToastMessage>(null);

  const {control, handleSubmit, watch} = useForm<SignUpDataType>({
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
      toastMessage.current?.show('Error', error.response.data.message, 4000);
    }
  };

  const isDisabled =
    !watch('username') ||
    !watch('password') ||
    !watch('email') ||
    !watch('address') ||
    !watch('age') ||
    !watch('firstname') ||
    !watch('lastname') ||
    !watch('phone') ||
    !watch('sex');

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={isIOS()}>
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
          {/* <CustomPickerControlled
            name="sex"
            placeholder={t('common.chooseGender')}
            data={GENDER}
            styleModal={styles.modalContainer}
            label={t('common.gender')}
            dropdownIconColor={palette.lightGrey}
            controller={control}
            isErrorField={true}
          /> */}
          <PickerWithTicker
            name="sex"
            placeholder={t('common.chooseGender')}
            data={GENDER}
            styleModal={styles.modalContainer}
            label={t('common.gender')}
            dropdownIconColor={palette.lightGrey}
            controller={control}
            isErrorField={true}
            onValueChange={item => setSelectedValue(item)}
            selectedValue={selectedValue}
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
      </KeyboardAvoidingView>
      <ToastMessage ref={toastMessage} />
    </SafeAreaView>
  );
};
