import React, {useEffect, useState} from 'react';
import {Text, View, Image, FlatList, ListRenderItemInfo} from 'react-native';
import {API_List} from '../../../../API';
import axios from 'axios';
import {AppNavigationProps} from '../../../../navigation/Routes';
import Modal from 'react-native-modal';
import dayjs from 'dayjs';
import {
  showToast,
  ModalLoad,
  HeaderBar,
  ListItem,
  Button,
} from '../../../../components';
import {styleAppointmentListScreen as style} from './style';
import {
  pic_appointmentColor,
  pic_calendar,
  pic_notFound,
} from '../../../../../assets';

interface AppointmentDataProps {
  id: string | number;
  nameOfClinic: string;
  description: string;
  appointmentStartTime: string;
  status: string;
}

export const AppointmentListScreen = ({
  route,
}: AppNavigationProps<'AppointmentList'>) => {
  const [data, setData] = useState<Array<AppointmentDataProps>>([]);
  const [statusResponse, setStatusResponse] = useState<number>(0);
  const [itemId, setItemId] = useState<string | number>(0);

  // for modal
  const [isVisibleLoad, setVisibleLoad] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [clinic, setClinic] = useState('');
  const [time, setTime] = useState('');
  const [describe, setDescribe] = useState('');
  const [statusAppointment, setStatusAppointment] = useState('');

  useEffect(() => {
    const getAppointment = async () => {
      try {
        let response = await axios.get(
          API_List.appointmentFindPatient + route.params.userID,
          {
            headers: {
              Authorization: `Bearer ${route.params.token}`,
            },
          },
        );
        setData(response.data);
        setStatusResponse(response.status);
      } catch (error) {
        showToast('Something went wrong');
      }
    };
    getAppointment();
  }, [route.params.token, route.params.userID]);

  const openModal = async () => {
    setVisibleLoad(true);
    try {
      let response = await axios.get(API_List.appointmentGeneral + itemId, {
        headers: {
          Authorization: `Bearer ${route.params.token}`,
        },
      });
      setClinic(response.data.nameOfClinic);
      setTime(response.data.appointmentStartTime);
      setDescribe(response.data.description);
      setStatusAppointment(response.data.status);
      setVisibleLoad(false);
      setVisible(true);
    } catch (error) {
      setVisibleLoad(false);
      showToast('Something went wrong');
    }
  };

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  const renderItem = ({item}: ListRenderItemInfo<AppointmentDataProps>) => {
    return (
      <ListItem
        style={[style.buttonNoColor, style.shadowGray]}
        activeOpacity={0.8}
        onPressIn={() => setItemId(item.id)}
        onPress={openModal}
        imageSource={pic_calendar}
        isMultipleAtrribute={true}>
        <Text style={style.textSmallBoldBlack}>
          Clinic: {item.nameOfClinic}
        </Text>
        <Text style={style.textSmallNormalBlack}>
          Time:{' '}
          {dayjs(item.appointmentStartTime).format('ddd, MMM D, YYYY HH:mm')}
        </Text>
        <Text style={style.textSmallNormalBlack}>Status: {item.status}</Text>
      </ListItem>
    );
  };

  return (
    <View style={style.container}>
      <HeaderBar text="Appointment" isBack={true} />
      <View style={style.container2}>
        <View style={style.topScreen}>
          <Image style={style.image} source={pic_appointmentColor} />
          <Text style={[style.textAlignCenter, style.textBigBoldBlack]}>
            Your Appointments
          </Text>
        </View>
        <ModalLoad isVisibleLoad={isVisibleLoad} />

        {statusResponse === 200 ? (
          <View style={style.midScreen}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => `row-${item.id}`}
            />

            <Modal
              isVisible={isVisible}
              onBackdropPress={() => setVisible(false)}>
              <View style={style.modal}>
                <Text
                  style={[style.textAlignCenter, style.textNormalBoldBlack]}>
                  Appointment Detail
                </Text>
                <Text style={[style.textAlignLeft, style.textNormalBlack]}>
                  Clinic: {clinic}
                </Text>
                <Text style={[style.textAlignLeft, style.textNormalBlack]}>
                  Time: {dayjs(time).format('ddd, MMM D, YYYY HH:mm')}
                </Text>
                <Text style={[style.textAlignLeft, style.textNormalBlack]}>
                  Description: {describe}
                </Text>
                <Text style={[style.textAlignLeft, style.textNormalBlack]}>
                  Status: {statusAppointment}
                </Text>
                <Button
                  style={[style.buttonBlue, style.shadowBlue]}
                  activeOpacity={0.8}
                  text="Close"
                  textStyle={[style.textAlignCenter, style.textNormalBoldWhite]}
                  onPress={toggleModal}
                />
              </View>
            </Modal>
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
