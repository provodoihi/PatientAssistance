import React, {useEffect} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {AppNavigationProps} from '../../../navigation/Routes';
import axios from 'axios';
import {API_List} from '../../../API';
import {pic_userColor} from '../../../../assets';
import {
  TextInputField,
  showToast,
  showToastLong,
  UpdateProfileSchema,
  Button,
  HeaderBar,
} from '../../../components';
import {styleProfileScreen as style} from './style';
import {useForm} from 'react-hook-form';

export const ProfileScreen = ({
  navigation,
  route,
}: AppNavigationProps<'Profile'>) => {
  const fullname: string = route.params.name;
  const token: string = route.params.token;
  const role: string = route.params.role;

  interface ProfileDataProps {
    firstname: string;
    lastname: string;
    address: string;
    age: number | string;
  }

  const {control, handleSubmit, setValue} = useForm<ProfileDataProps>({
    resolver: UpdateProfileSchema,
  });

  // get profile
  useEffect(() => {
    const getProfile = async () => {
      try {
        let response = await axios.get(API_List.myProfile, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setValue('firstname', response.data.firstname);
        setValue('lastname', response.data.lastname);
        setValue('address', response.data.address);
        setValue('age', response.data.age);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [setValue, token]);

  const onSubmitProfile = async (data: ProfileDataProps) => {
    try {
      await axios.put(API_List.myProfile, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
            {fullname}
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
};
