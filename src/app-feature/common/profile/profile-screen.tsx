import React, {useCallback, useEffect} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppNavigationProps} from '../../../navigation/routes';
import {pic_userColor} from '../../../../assets';
import {
  TextInputField,
  showToast,
  showToastLong,
  Button,
  HeaderBar,
} from '../../../components';
import {UpdateProfileSchema} from '../../../utils';
import {observer} from 'mobx-react-lite';
import {styles} from './styles';
import {useStores, UpdateProfileDataType} from '../../../models';
import {useForm} from 'react-hook-form';

export const ProfileScreen = observer(
  ({navigation}: AppNavigationProps<'Profile'>) => {
    const {userStore, authStore} = useStores();
    const token: string = authStore.token;
    const role: string = authStore.role;

    const {control, handleSubmit, setValue} = useForm<UpdateProfileDataType>({
      resolver: UpdateProfileSchema,
    });

    const getProfile = useCallback(async () => {
      try {
        await userStore.getUserInfo(token);
        setValue('firstname', userStore.firstname);
        setValue('lastname', userStore.lastname);
        setValue('address', userStore.address);
        setValue('age', userStore.age);
      } catch (error) {
        showToast('Something went wrong');
      }
    }, [setValue, token, userStore]);

    // get profile
    useEffect(() => {
      getProfile();
    }, [getProfile]);

    //set new fullname when fullname change
    useEffect(() => {
      authStore.updateFullname(userStore.fullname);
    }, [authStore, userStore.fullname]);

    const onSubmitProfile = async (data: UpdateProfileDataType) => {
      try {
        await userStore.updateProfile(data, token);
        showToast('Upload profile successfully');
      } catch (error) {
        showToastLong('Something went wrong');
      }
    };

    return (
      <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
        <HeaderBar text="Profile" isBack={true} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.container2}>
            <Image style={styles.image} source={pic_userColor} />
            <Text style={[styles.textAlignCenter, styles.textBigBoldBlack]}>
              {userStore.fullname}
            </Text>
            <Text style={[styles.textAlignCenter, styles.textNormalBlack]}>
              {role}
            </Text>
            <TextInputField
              placeholder="firstname"
              placeholderTextColor="#9FA5AA"
              multiline={false}
              isErrorField={true}
              controller={control}
              label="Firstname"
              name="firstname"
            />
            <TextInputField
              placeholder="lastname"
              placeholderTextColor="#9FA5AA"
              multiline={false}
              isErrorField={true}
              controller={control}
              label="Lastname"
              name="lastname"
            />
            <TextInputField
              placeholder="address"
              placeholderTextColor="#9FA5AA"
              multiline={false}
              isErrorField={true}
              controller={control}
              label="Address"
              name="address"
            />
            <TextInputField
              placeholder="age"
              placeholderTextColor="#9FA5AA"
              maxLength={3}
              keyboardType="number-pad"
              multiline={false}
              isErrorField={true}
              controller={control}
              label="Age"
              name="age"
            />
            <Button
              style={[styles.buttonBlue, styles.shadowBlue]}
              textStyle={[styles.textAlignCenter, styles.textBigBoldWhite]}
              activeOpacity={0.8}
              onPress={handleSubmit(onSubmitProfile)}
              text="Update My Profile"
            />
            <Button
              style={[styles.buttonBlue, styles.shadowBlue]}
              textStyle={[styles.textAlignCenter, styles.textBigBoldWhite]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('BMI')}
              text="My BMI"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  },
);
