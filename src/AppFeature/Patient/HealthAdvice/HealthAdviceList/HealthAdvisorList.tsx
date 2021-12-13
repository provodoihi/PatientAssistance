import React, {useEffect, useState} from 'react';
import {Text, View, Image, FlatList, ListRenderItemInfo} from 'react-native';
import {pic_qaColor, pic_notFound} from '../../../../../assets';
import {styleAnswerListScreen as style} from './style';
import {HeaderBar, ListItem, showToast} from '../../../../components';
import {useStores, AnswerType} from '../../../../models';
import {observer} from 'mobx-react-lite';

export const HealthAdvisorListScreen = observer(() => {
  const [data, setData] = useState<Array<AnswerType>>([]);

  const {authStore, answerStore} = useStores();

  useEffect(() => {
    const getAnswerList = async () => {
      try {
        let response = await answerStore.getAnswerList(authStore.token);
        setData(response);
      } catch (error) {
        showToast('Something went wrong');
      }
    };
    getAnswerList();
  }, [answerStore, authStore.token]);

  const renderItem = ({item}: ListRenderItemInfo<AnswerType>) => {
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
        {answerStore.responseStatus === 200 ? (
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
});
