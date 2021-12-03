import React, {useEffect, useState} from 'react';
import {Text, View, Image, FlatList, ListRenderItemInfo} from 'react-native';
import {API_List} from '../../../../API';
import axios from 'axios';
import {AppNavigationProps} from '../../../../navigation/Routes';
import {pic_qaColor, pic_notFound} from '../../../../../assets';
import {styleAnswerListScreen as style} from './style';
import {HeaderBar, ListItem} from '../../../../components';

interface AnswerDataProps {
  id: string | number;
  questionDetail: string;
  answerDetail: string;
}

export const HealthAdvisorListScreen = ({
  route,
}: AppNavigationProps<'QAList'>) => {
  const [data, setData] = useState<Array<AnswerDataProps>>([]);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const getAnswerList = async () => {
      try {
        let response = await axios.get(API_List.answerPatient, {
          headers: {
            Authorization: `Bearer ${route.params.token}`,
          },
        });
        setData(response.data);
        setStatus(response.status);
      } catch (error) {
        console.log(error);
      }
    };
    getAnswerList();
  }, [route.params.token]);

  const renderItem = ({item}: ListRenderItemInfo<AnswerDataProps>) => {
    return (
      <ListItem
        style={[style.buttonNoColor, style.shadowGray]}
        activeOpacity={1}
        imageSource={pic_qaColor}
        isMultipleAtrribute={true}>
        <Text style={style.textSmallBoldBlack}>
          Question: {item.questionDetail}
        </Text>
        <Text style={style.textSmallNormalBlack}>
          Answer: {item.answerDetail}
        </Text>
      </ListItem>
    );
  };

  return (
    <View style={style.container}>
      <HeaderBar text="Health Advisor" isBack={true} />
      <View style={style.container2}>
        <View style={style.topScreen}>
          <Image style={style.image} source={pic_qaColor} />
          <Text style={[style.textAlignCenter, style.textBigBoldBlack]}>
            Your Questions Answers
          </Text>
        </View>
        {status === 200 ? (
          <View style={style.midScreen}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => `row-${item.id}`}
            />
          </View>
        ) : (
          <View style={style.midScreen}>
            <Image style={style.image} source={pic_notFound} />
            <Text style={[style.textAlignCenter, style.textBigBoldBlack]}>
              Not found
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
