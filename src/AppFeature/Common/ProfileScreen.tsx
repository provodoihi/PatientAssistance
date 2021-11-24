import React, {useEffect, useState} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {AppNavigationProps} from '../../navigation/Routes';
import axios from 'axios';
import {API_List} from '../../API';
import {pic_userColor} from '../../../assets';
import {
  TextInputField,
  showToast,
  UpdateProfileSchema,
  Button,
  HeaderBar,
} from '../../components';
import {commonScreenStyle as style} from './style';
import {useForm} from 'react-hook-form';

export const ProfileScreen = ({
  navigation,
  route,
}: AppNavigationProps<'Profile'>) => {
  const fullname: string = route.params.name;
  const token: string = route.params.token;
  const role: string = route.params.role;

  // init data for placeholder
  const [firstnameInit, setFirstname] = useState<string>('');
  const [lastnameInit, setLastname] = useState<string>('');
  const [ageInit, setAge] = useState<string | number>('');
  const [addressInit, setAddress] = useState<string>('');

  // placeholder
  const f1nameplace: string = `Firstname: ${firstnameInit}`;
  const f2nameplace: string = `Lastname: ${lastnameInit}`;
  const addressplace: string = `Address: ${addressInit}`;
  const ageplace: string = `Age: ${ageInit}`;

  interface ProfileDataProps {
    firstname: string;
    lastname: string;
    address: string;
    age: number | string;
  }

  const {control, handleSubmit} = useForm<ProfileDataProps>({
    defaultValues: {
      firstname: firstnameInit,
      lastname: lastnameInit,
      address: addressInit,
      age: ageInit,
    },
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
        setFirstname(response.data.firstname);
        setLastname(response.data.lastname);
        setAddress(response.data.address);
        setAge(response.data.age);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [token]);

  const onSubmit = (data: ProfileDataProps) => {
    axios
      .put(API_List.myProfile, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        showToast('Upload profile successfully');
      })
      .catch(() => {
        showToast('Something went wrong');
      });
  };

  return (
    <View style={style.container}>
      <HeaderBar text="Profile" isBack={true} />
      <ScrollView style={style.container2}>
        <View style={style.containerProfileScreen}>
          <Image style={style.image} source={pic_userColor} />
          <Text style={[style.txt, style.txtNameProfileScreen]}>
            {fullname}
          </Text>
          <Text style={[style.txt, style.txtRoleProfileScreen]}>{role}</Text>
          <TextInputField
            placeholder={f1nameplace}
            placeholderTextColor="#9FA5AA"
            multiline={false}
            isErrorField={true}
            controller={control}
            name="firstname"
          />
          <TextInputField
            placeholder={f2nameplace}
            placeholderTextColor="#9FA5AA"
            multiline={false}
            isErrorField={true}
            controller={control}
            name="lastname"
          />
          <TextInputField
            placeholder={addressplace}
            placeholderTextColor="#9FA5AA"
            multiline={false}
            isErrorField={true}
            controller={control}
            name="address"
          />
          <TextInputField
            placeholder={ageplace}
            placeholderTextColor="#9FA5AA"
            maxLength={3}
            keyboardType="number-pad"
            multiline={false}
            isErrorField={true}
            controller={control}
            name="age"
          />
          <Button
            style={[style.buttonColor, style.shadowBlue]}
            textStyle={[style.txt, style.txtButton]}
            activeOpacity={0.8}
            onPress={handleSubmit(onSubmit)}
            text="Update My Profile"
          />
          <Button
            style={[style.buttonColor, style.shadowBlue]}
            activeOpacity={0.8}
            textStyle={[style.txt, style.txtButton]}
            onPress={() => navigation.navigate('BMI')}
            text="My BMI"
          />
        </View>
      </ScrollView>
    </View>
  );
};
