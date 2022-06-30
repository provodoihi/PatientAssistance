import React, {useState} from 'react';
import {Text, View, Image, FlatList, ListRenderItemInfo} from 'react-native';
import {AppNavigationProps} from '../../../navigation/routes';
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
import {styles} from './styles';
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
          style={[styles.buttonNoColor, styles.shadowGray]}
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
          <Text style={styles.textSmallBoldBlack}>{item.name}</Text>
          <Text style={styles.textSmallNormalBlack}>{item.address}</Text>
          <Text style={styles.textSmallNormalBlack}>{item.phone}</Text>
        </ListItem>
      );
    };

    const Notfound = () => {
      return (
        <View style={styles.midScreen}>
          <Image style={styles.image} source={pic_notFound} />
          <Text style={[styles.textAlignCenter, styles.textBigBoldBlack]}>
            Not found
          </Text>
        </View>
      );
    };

    const Init = () => {
      return (
        <View style={styles.midScreen}>
          <Image style={styles.image} source={pic_search} />
          <Text style={[styles.textAlignCenter, styles.textNormalBlack]}>
            Search hospitals and clinics
          </Text>
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <HeaderBar text="Find Hospital Clinic" isBack={true} />
        <View style={styles.container2}>
          <ModalLoad isVisibleLoad={isVisible} />
          <View style={styles.searchBox}>
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
            <View style={styles.midScreen}>
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
