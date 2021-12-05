import React, {useState} from 'react';
import {Text, View, Image, FlatList, ListRenderItemInfo} from 'react-native';
import {AppNavigationProps} from '../../../navigation/Routes';
import {API_List} from '../../../API';
import axios from 'axios';
import {
  showToast,
  ModalLoad,
  TextInputField,
  SearchSchema,
  ListItem,
  HeaderBar,
} from '../../../components';
import {useForm} from 'react-hook-form';
import {styleLocationSearchScreen as style} from './style';
import {pic_healthClinic, pic_notFound, pic_search} from '../../../../assets';

const Notfound = () => {
  return (
    <View style={style.midScreen}>
      <Image style={style.image} source={pic_notFound} />
      <Text style={[style.textAlignCenter, style.textBigBoldBlack]}>
        Not found
      </Text>
    </View>
  );
};

const Init = () => {
  return (
    <View style={style.midScreen}>
      <Image style={style.image} source={pic_search} />
      <Text style={[style.textAlignCenter, style.textNormalBlack]}>
        Search hospitals and clinics
      </Text>
    </View>
  );
};

interface LocationListItem {
  id: number | string;
  name: string;
  latitude: number;
  longtitude: number;
  address: string;
  phone: string;
}

export const LocationScreen = ({
  navigation,
}: AppNavigationProps<'Location'>) => {
  const [data, setData] = useState<Array<LocationListItem>>([]);
  const [status, setStatus] = useState<number>(0);
  const [isVisible, setVisible] = useState<boolean>(false);

  interface SearchProps {
    keyword: string;
  }

  const {control, handleSubmit} = useForm<SearchProps>({
    defaultValues: {
      keyword: '',
    },
    resolver: SearchSchema,
  });

  const onSubmit = async (search: SearchProps) => {
    try {
      setVisible(true);
      let response = await axios.get(API_List.filterLocation + search.keyword);
      setStatus(response.status);
      setData(response.data);
      setVisible(false);
    } catch (error) {
      setVisible(false);
      showToast('Something went wrong');
    }
  };

  const renderItem = ({item}: ListRenderItemInfo<LocationListItem>) => {
    return (
      <ListItem
        style={[style.buttonNoColor, style.shadowGray]}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('MapView', {
            name: item.name,
            latitude: item.latitude,
            longtitude: item.longtitude,
          });
        }}
        isMultipleAtrribute={true}
        imageSource={pic_healthClinic}>
        <Text style={style.textSmallBoldBlack}>{item.name}</Text>
        <Text style={style.textSmallNormalBlack}>{item.address}</Text>
        <Text style={style.textSmallNormalBlack}>{item.phone}</Text>
      </ListItem>
    );
  };

  return (
    <View style={style.container}>
      <HeaderBar text="Find Hospital Clinic" isBack={true} />
      <View style={style.container2}>
        <ModalLoad isVisibleLoad={isVisible} />
        <View style={style.searchBox}>
          <TextInputField
            onSubmitEditing={handleSubmit(onSubmit)}
            placeholder="Search here"
            placeholderTextColor="#9FA5AA"
            multiline={false}
            controller={control}
            isErrorField={false}
            name="keyword"
          />
        </View>
        {status === 200 ? (
          <View style={style.midScreen}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => `row-${item.id}`}
            />
          </View>
        ) : status === 204 ? (
          <Notfound />
        ) : (
          <Init />
        )}
      </View>
    </View>
  );
};