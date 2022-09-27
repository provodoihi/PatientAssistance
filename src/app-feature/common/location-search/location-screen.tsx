import React, {useState} from 'react';
import {Text, View, FlatList, ListRenderItemInfo} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppNavigationProps} from '../../../navigation/routes';
import {
  showToast,
  ModalLoad,
  TextInputField,
  ListItem,
  HeaderBar,
} from '../../../components';
import {SearchSchema} from '../../../utils';
import {useForm} from 'react-hook-form';
import {useStores, LocationDataType} from '../../../models';
import {styles} from './styles';
import {NotFound, Initial} from './components';
import {pic_healthClinic} from '../../../../assets';
import {observer} from 'mobx-react-lite';

type SearchProps = {
  keyword: string;
};

export const LocationScreen = observer(
  ({navigation}: AppNavigationProps<'Location'>) => {
    const [data, setData] = useState<Array<LocationDataType>>([]);
    const [isVisible, setVisible] = useState<boolean>(false);

    const {locationStore} = useStores();

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

    return (
      <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
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
            <NotFound />
          ) : (
            <Initial />
          )}
        </View>
      </SafeAreaView>
    );
  },
);
