import React, {useState} from 'react';
import {Text, View, Image, FlatList, ListRenderItemInfo} from 'react-native';
import {AppNavigationProps} from '../../../navigation/Routes';
import {
  showToast,
  ModalLoad,
  TextInputField,
  SearchSchema,
  ListItem,
  HeaderBar,
} from '../../../components';
import {useForm} from 'react-hook-form';
import {useStores, LocationDataType} from '../../../models';
import {styleLocationSearchScreen as style} from './style';
import {pic_healthClinic, pic_notFound, pic_search} from '../../../../assets';
import {observer} from 'mobx-react-lite';

export const LocationScreen = observer(
  ({navigation}: AppNavigationProps<'Location'>) => {
    const [data, setData] = useState<Array<LocationDataType>>([]);
    const [isVisible, setVisible] = useState<boolean>(false);

    const {locationStore} = useStores();

    interface SearchProps {
      keyword: string;
    }

    const {control, handleSubmit} = useForm<SearchProps>({
      defaultValues: {
        keyword: '',
      },
      resolver: SearchSchema,
    });

    const onSubmit = async ({keyword}: SearchProps) => {
      try {
        setVisible(true);
        let response = await locationStore.getLocationList(keyword);
        setData(response);
        setVisible(false);
      } catch (error) {
        setVisible(false);
        showToast('Something went wrong');
      }
    };

    const renderItem = ({item}: ListRenderItemInfo<LocationDataType>) => {
      return (
        <ListItem
          style={[style.buttonNoColor, style.shadowGray]}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('MapView', {
              name: item.name,
              latitude: item.latitude,
              longitude: item.longtitude,
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
          {locationStore.responseStatus === 200 ? (
            <View style={style.midScreen}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => `row-${item.id}`}
              />
            </View>
          ) : locationStore.responseStatus === 204 ? (
            <Notfound />
          ) : (
            <Init />
          )}
        </View>
      </View>
    );
  },
);
