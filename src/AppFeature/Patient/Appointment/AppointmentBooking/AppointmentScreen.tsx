import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {AppNavigationProps} from '../../../../navigation/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import Oops from '../../../../components/Oops';
import {API_List} from '../../../../API';
import Modal from 'react-native-modal';
import axios from 'axios';
import {
  showToast,
  HeaderBar,
  Button,
  TextNavigation,
  TextInputField,
  AppointmentBookingSchema,
  PickerControlled,
} from '../../../../components';
import {useForm} from 'react-hook-form';
import {appointmentBookingStyle as style} from './style';
import {pic_appointmentColor} from '../../../../../assets';
import dayjs from 'dayjs';

export const AppointmentScreen = ({
  navigation,
  route,
}: AppNavigationProps<'Appointment'>) => {
  const [userID, setUserID] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [token, setToken] = useState(route.params.token);
  const [fullname, setFullName] = useState(route.params.name);
  const [userRole, setUserRole] = useState(route.params.role);
  const [isVisible, setVisible] = useState(false);

  interface AppointmentBookingProps {
    description: string;
    clinicId: string | number;
    nameOfClinic: string;
  }

  useEffect(() => {
    const getData = async () => {
      try {
        if (token === '' || fullname === '' || userRole === '') {
          const value = await AsyncStorage.getItem('token');
          const value2 = await AsyncStorage.getItem('name');
          const value3 = await AsyncStorage.getItem('role');
          if (value !== null) {
            setToken(value);
          }
          if (value2 !== null) {
            setFullName(value2);
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
          setPhone(value5);
        }
      } catch (e) {
        console.log('Error');
      }
    };
    getData();
  }, [fullname, token, userRole]);

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  const {control, handleSubmit} = useForm<AppointmentBookingProps>({
    defaultValues: {
      description: '',
      clinicId: '',
      nameOfClinic: '',
    },
    resolver: AppointmentBookingSchema,
  });

  const onSubmitAppointment = async (data: AppointmentBookingProps) => {
    try {
      let appointmentStartTime: string = dayjs(date).format();
      let nameOfPatient: string = fullname;
      let phoneOfPatient: string = phone;
      let patientId: string | number = userID;
      let AppointmentData = {
        ...data,
        appointmentStartTime,
        nameOfPatient,
        phoneOfPatient,
        patientId,
      };
      await axios.post(API_List.appointmentGeneral, AppointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast('Successfully booking appointment');
    } catch (error) {
      showToast('Something went wrong');
    }
  };

  if (userRole === 'ROLE_PATIENT') {
    return (
      <View style={style.container}>
        <HeaderBar text="Appointment" isBack={true} />
        <ScrollView style={style.scrollView}>
          <View style={style.container2}>
            <Image style={style.image} source={pic_appointmentColor} />
            <Text style={[style.textAlignCenter, style.textBigBoldBlack]}>
              Book new appointment
            </Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={[style.textAlignCenter, style.textNormalBlack]}>
                Choose appointment time
              </Text>
            </TouchableOpacity>

            <Text style={[style.textAlignCenter, style.textSmallNormalBlack]}>
              Time: {dayjs(date).format('ddd, MMM D, YYYY HH:mm')}
            </Text>
            <TextInputField
              placeholder="Description"
              placeholderTextColor="#9FA5AA"
              multiline={false}
              name="description"
              controller={control}
              isErrorField={true}
            />
            <PickerControlled
              dropdownIconColor="#9FA5AA"
              name="nameOfClinic"
              placeholder="Choose Clinic"
              data={['Clinic 01', 'Clinic 02']}
              controller={control}
              isErrorField={true}
            />
            <PickerControlled
              dropdownIconColor="#9FA5AA"
              name="clinicId"
              placeholder="Choose Clinic ID"
              data={['21', '22']}
              controller={control}
              isErrorField={true}
            />
            <Button
              style={[style.buttonBlue, style.shadowBlue]}
              activeOpacity={0.8}
              onPress={handleSubmit(onSubmitAppointment)}
              text="Book Now"
              textStyle={[style.textAlignCenter, style.textBigBoldWhite]}
            />
            <TextNavigation
              onPress={() =>
                navigation.navigate('AppointmentList', {
                  token: token,
                  userID: userID,
                })
              }
              text="View My Appointments"
            />
          </View>
          <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
            <View style={style.modal}>
              <Text style={[style.textAlignCenter, style.textSmallNormalBlack]}>
                Choose appointment time
              </Text>
              <DatePicker
                date={date}
                minimumDate={new Date(Date.now())}
                onDateChange={setDate}
                style={style.datePicker}
              />
              <Button
                style={[style.buttonBlue, style.shadowBlue]}
                activeOpacity={0.8}
                onPress={toggleModal}
                text="Save"
                textStyle={[style.textAlignCenter, style.textNormalBoldWhite]}
              />
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  } else {
    return <Oops text="For Patient" />;
  }
};
