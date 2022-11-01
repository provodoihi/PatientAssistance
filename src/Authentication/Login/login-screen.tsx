import React, {useRef, useState} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthNavigationProps} from '../../navigation/routes';
import {useTranslation} from 'react-i18next';
import {CommonActions} from '@react-navigation/routers';
import {useForm} from 'react-hook-form';
import {
  Button,
  ModalLoad,
  TextNavigation,
  TextInputField,
  ToastMessage,
} from '../../components';
import {SignInSchema} from '../../utils';
import {useStores, SignInDataType} from '../../models';
import {styles} from './styles';
import {palette} from '../../utils';

export const LoginScreen = ({navigation}: AuthNavigationProps<'Login'>) => {
  const [isVisibleLoad, setVisibleLoad] = useState<boolean>(false);
  const {authStore} = useStores();
  const {t} = useTranslation();
  const toastMessage = useRef<ToastMessage>(null);

  const {control, handleSubmit, watch} = useForm<SignInDataType>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: SignInSchema,
  });

  const isDisabled = !watch('username').length || !watch('password').length;

  const onSubmitLogin = async (data: SignInDataType) => {
    setVisibleLoad(true);
    try {
      await authStore.login(data);
      setVisibleLoad(false);
      navigation.dispatch(
        CommonActions.reset({index: 0, routes: [{name: 'Main'}]}),
      );
    } catch (error) {
      setVisibleLoad(false);
      toastMessage.current?.show('Error', t('errors.invalidUser'), 4000);
    }
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <Text style={[styles.textAlignCenter, styles.textBigBoldBlack]}>
        {t('loginScreen.signIn')}
      </Text>
      <Text style={[styles.textAlignCenter, styles.textNormalGray]}>
        {t('loginScreen.enterSignInDetails')}
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
        placeholder={t('common.password')}
        placeholderTextColor={palette.lightGrey}
        secureTextEntry={true}
        multiline={false}
        controller={control}
        name="password"
        label={t('common.password')}
        isErrorField={true}
        onSubmitEditing={handleSubmit(onSubmitLogin)}
      />

      <Button
        style={[styles.buttonBlue, styles.shadowBlue]}
        textStyle={[styles.textAlignCenter, styles.textBigBoldWhite]}
        disabled={isDisabled}
        activeOpacity={0.8}
        onPress={handleSubmit(onSubmitLogin)}
        text={t('loginScreen.signIn')}
      />
      <TextNavigation
        text={t('loginScreen.dontHaveAccount')}
        onPress={() => navigation.navigate('Register')}
        // onPress={test}
      />
      <ModalLoad isVisibleLoad={isVisibleLoad} />
      <ToastMessage ref={toastMessage} />
    </SafeAreaView>
  );
};
