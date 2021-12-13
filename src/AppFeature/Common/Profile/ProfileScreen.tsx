import React, {useEffect} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {AppNavigationProps} from '../../../navigation/Routes';
import {pic_userColor} from '../../../../assets';
import {
  TextInputField,
  showToast,
  showToastLong,
  UpdateProfileSchema,
  Button,
  HeaderBar,
} from '../../../components';
import {observer} from 'mobx-react-lite';
import {styleProfileScreen as style} from './style';
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

    // get profile
    useEffect(() => {
      const getProfile = async () => {
        try {
          await userStore.getUserInfo(token);
          setValue('firstname', userStore.firstname);
          setValue('lastname', userStore.lastname);
          setValue('address', userStore.address);
          setValue('age', userStore.age);
        } catch (error) {
          showToast('Something went wrong');
        }
      };
      getProfile();
    }, [setValue, token, userStore]);

    //set new fullname when fullname change
    useEffect(() => {
      authStore.updateFullname(userStore.fullname);
      console.log(authStore.fullname);
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
      <View style={style.container}>
        <HeaderBar text="Profile" isBack={true} />
        <ScrollView style={style.scrollView}>
          <View style={style.container2}>
            <Image style={style.image} source={pic_userColor} />
            <Text style={[style.textAlignCenter, style.textBigBoldBlack]}>
              {userStore.fullname}
            </Text>
            <Text style={[style.textAlignCenter, style.textNormalBlack]}>
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
              style={[style.buttonBlue, style.shadowBlue]}
              textStyle={[style.textAlignCenter, style.textBigBoldWhite]}
              activeOpacity={0.8}
              onPress={handleSubmit(onSubmitProfile)}
              text="Update My Profile"
            />
            <Button
              style={[style.buttonBlue, style.shadowBlue]}
              textStyle={[style.textAlignCenter, style.textBigBoldWhite]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('BMI')}
              text="My BMI"
            />
          </View>
        </ScrollView>
      </View>
    );
  },
);
