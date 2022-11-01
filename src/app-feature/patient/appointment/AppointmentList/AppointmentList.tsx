import React, {useEffect, useState} from 'react';
import {Text, View, Image, FlatList, ListRenderItemInfo} from 'react-native';
import Modal from 'react-native-modal';
import dayjs from 'dayjs';
import {showToast, ModalLoad, ListItem, Button} from '../../../../components';
import {styleAppointmentListScreen as style} from './style';
import {
  pic_appointmentColor,
  pic_calendar,
  pic_notFound,
} from '../../../../../assets';
import {AppointmentDataType, useStores} from '../../../../models';
import {observer} from 'mobx-react-lite';

export const AppointmentListScreen = observer(() => {
  const [data, setData] = useState<Array<AppointmentDataType>>([]);
  const [itemId, setItemId] = useState<string | number>(0);

  const {authStore, appointmentStore} = useStores();
  const token: string = authStore.token;

  // for modal
  const [isVisibleLoad, setVisibleLoad] = useState<boolean>(false);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [clinic, setClinic] = useState<string>('');
  const [time, setTime] = useState<string | Date>('');
  const [describe, setDescribe] = useState<string>('');
  const [statusAppointment, setStatusAppointment] = useState<string>('');

  useEffect(() => {
    const getAppointment = async () => {
      try {
        setVisibleLoad(true);
        let response = await appointmentStore.getAppointmentList(
          authStore.userID,
          authStore.token,
        );
        setData(response);
        setVisibleLoad(false);
      } catch (error) {
        setVisibleLoad(false);
        showToast('Something went wrong');
      }
    };
    getAppointment();
  }, [appointmentStore, authStore.token, authStore.userID]);

  const openModal = async () => {
    setVisibleLoad(true);
    try {
      let response = await appointmentStore.getAppointmentByID(itemId, token);
      setClinic(response.nameOfClinic);
      setTime(response.appointmentStartTime);
      setDescribe(response.description);
      setStatusAppointment(response.status);
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

  const renderItem = ({item}: ListRenderItemInfo<AppointmentDataType>) => {
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
        <View style={style.row}>
          <Text style={style.textSmallNormalBlack}>Status:</Text>
          <Text
            style={
              item.status === 'CONFIRMED'
                ? style.textSmallNormalGreen
                : item.status === 'CANCELED'
                ? style.textSmallNormalRed
                : style.textSmallNormalOrange
            }>
            {item.status}
          </Text>
        </View>
      </ListItem>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.container2}>
        <View style={style.topScreen}>
          <Image style={style.image} source={pic_appointmentColor} />
          <Text style={[style.textAlignCenter, style.textBigBoldBlack]}>
            Your Appointments
          </Text>
        </View>
        <ModalLoad isVisibleLoad={isVisibleLoad} />

        {appointmentStore.responseStatus === 200 ? (
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
                <View style={style.row}>
                  <Text style={[style.textAlignLeft, style.textNormalBlack]}>
                    Status:
                  </Text>
                  <Text
                    style={[
                      statusAppointment === 'CONFIRMED'
                        ? style.textNormalGreen
                        : statusAppointment === 'CANCELED'
                        ? style.textNormalRed
                        : style.textNormalOrange,
                      style.textAlignLeft,
                    ]}>
                    {statusAppointment}
                  </Text>
                </View>
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
});
