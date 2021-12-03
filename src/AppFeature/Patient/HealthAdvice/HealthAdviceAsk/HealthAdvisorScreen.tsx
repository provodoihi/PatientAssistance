import React, {useEffect, useState} from 'react';
import {Text, View, Image} from 'react-native';
import {AppNavigationProps} from '../../../../navigation/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_List} from '../../../../API';
import {pic_qaColor} from '../../../../../assets';
import {styleAdviceQuestionScreen as style} from './style';
import {useForm} from 'react-hook-form';
import {
  showToast,
  HeaderBar,
  Button,
  QuestionAskingSchema,
  TextInputField,
  Oops,
} from '../../../../components';

export const HealthAdvisorScreen = ({
  navigation,
  route,
}: AppNavigationProps<'HealthAdvisor'>) => {
  const [userID, setUserID] = useState<string | number>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [token, setToken] = useState<string>(route.params.token);
  const [userFullname, setUserFullName] = useState<string>(route.params.name);
  const [userRole, setUserRole] = useState<string>(route.params.role);

  useEffect(() => {
    const getData = async () => {
      try {
        if (token === '' || userFullname === '' || userRole === '') {
          const value = await AsyncStorage.getItem('token');
          const value2 = await AsyncStorage.getItem('name');
          const value3 = await AsyncStorage.getItem('role');
          if (value !== null) {
            setToken(value);
          }
          if (value2 !== null) {
            setUserFullName(value2);
          }
          if (value3 !== null) {
            setUserRole(value3);
          }
          console.log('note');
        }
        const value4 = await AsyncStorage.getItem('userID');
        const value5 = await AsyncStorage.getItem('phone');
        if (value4 !== null) {
          setUserID(value4);
        }
        if (value5 !== null) {
          setUserPhone(value5);
        }
      } catch (e) {
        console.log('Error');
      }
    };
    getData();
  }, [userFullname, token, userRole]);

  interface QuestionProps {
    questionDetail: string;
  }

  const {control, handleSubmit} = useForm<QuestionProps>({
    defaultValues: {
      questionDetail: '',
    },
    resolver: QuestionAskingSchema,
  });

  const onSubmitQuestion = async (data: QuestionProps) => {
    try {
      let userId: string | number = userID;
      let fullname: string = userFullname;
      let phone: string = userPhone;
      let QuestionData = {...data, userId, fullname, phone};
      await axios.post(API_List.question, QuestionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast('Successfully. Your question will be answer soon');
    } catch (error) {
      showToast('Something went wrong');
    }
  };

  if (userRole === 'ROLE_PATIENT') {
    return (
      <View style={style.container}>
        <HeaderBar text="Health Advice" isBack={true} />
        <View style={style.container2}>
          <Image style={style.image} source={pic_qaColor} />
          <Text style={[style.textAlignCenter, style.textBigBoldBlack]}>
            Ask questions to our health experts
          </Text>
          <TextInputField
            placeholder="Question"
            placeholderTextColor="#9FA5AA"
            multiline={false}
            name="questionDetail"
            isErrorField={true}
            controller={control}
          />
          <Button
            style={[style.buttonBlue, style.shadowBlue]}
            activeOpacity={0.8}
            text="Submit Question"
            textStyle={[style.textAlignCenter, style.textBigBoldWhite]}
            onPress={handleSubmit(onSubmitQuestion)}
          />
          <Button
            style={[style.buttonBlue, style.shadowBlue]}
            activeOpacity={0.8}
            text="View My Questions' Answers"
            textStyle={[style.textAlignCenter, style.textBigBoldWhite]}
            onPress={() => navigation.navigate('QAList', {token: token})}
          />
        </View>
      </View>
    );
  } else {
    return <Oops text="For Patient" />;
  }
};
