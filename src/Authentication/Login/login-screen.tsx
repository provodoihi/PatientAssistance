import React, {useState} from 'react';
import {Text, View, Alert} from 'react-native';
import {AuthNavigationProps} from '../../navigation/routes';
import {useTranslation} from 'react-i18next';
import {CommonActions} from '@react-navigation/routers';
import {useForm} from 'react-hook-form';
import {
  Button,
  SignInSchema,
  ModalLoad,
  TextNavigation,
  TextInputField,
} from '../../components';
import {useStores, SignInDataType} from '../../models';
import {styles} from './styles';
import {palette} from '../../utils';

export const LoginScreen = ({navigation}: AuthNavigationProps<'Login'>) => {
  const [isVisibleLoad, setVisibleLoad] = useState<boolean>(false);
  const {authStore} = useStores();
  const {t} = useTranslation();

  const {control, handleSubmit} = useForm<SignInDataType>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: SignInSchema,
  });

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
      Alert.alert('Error', 'Invalid username or password', [
        {
          text: 'OK',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.textAlignCenter, styles.textBigBoldBlack]}>
        {t('loginScreen.signIn')}
      </Text>
      <Text style={[styles.textAlignCenter, styles.textNormalGray]}>
        Enter your sign in details to access your account
      </Text>
      <ModalLoad isVisibleLoad={isVisibleLoad} />

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
        placeholder="Password"
        placeholderTextColor={palette.lightGrey}
        secureTextEntry={true}
        multiline={false}
        controller={control}
        name="password"
        label="Password"
        isErrorField={true}
        onSubmitEditing={handleSubmit(onSubmitLogin)}
      />

      <Button
        style={[styles.buttonBlue, styles.shadowBlue]}
        textStyle={[styles.textAlignCenter, styles.textBigBoldWhite]}
        activeOpacity={0.8}
        onPress={handleSubmit(onSubmitLogin)}
        text="Sign In"
      />
      <TextNavigation
        text="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};
