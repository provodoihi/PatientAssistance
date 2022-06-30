import React from 'react';
import {Text, View, Image} from 'react-native';
import {AppNavigationProps} from '../../../../navigation/routes';
import {pic_qaColor} from '../../../../../assets';
import {styleAdviceQuestionScreen as style} from './style';
import {useForm} from 'react-hook-form';
import {useStores, QuestionSubmitType} from '../../../../models';
import {
  showToast,
  HeaderBar,
  Button,
  QuestionAskingSchema,
  TextInputField,
  Oops,
} from '../../../../components';
import {observer} from 'mobx-react-lite';

export const HealthAdvisorScreen = observer(
  ({navigation}: AppNavigationProps<'HealthAdvisor'>) => {
    const {questionStore, authStore} = useStores();
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
        let userId: string | number = authStore.userID;
        let fullname: string = authStore.fullname;
        let phone: string = authStore.phone;
        let questionData: QuestionSubmitType = {
          ...data,
          userId,
          fullname,
          phone,
        };
        await questionStore.askQuestion(authStore.token, questionData);
        showToast('Successfully. Your question will be answer soon');
      } catch (error) {
        showToast('Something went wrong');
      }
    };

    if (authStore.role === 'ROLE_PATIENT') {
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
              onPress={() =>
                navigation.navigate('QAList', {token: authStore.token})
              }
            />
          </View>
        </View>
      );
    } else {
      return <Oops text="For Patient" />;
    }
  },
);
