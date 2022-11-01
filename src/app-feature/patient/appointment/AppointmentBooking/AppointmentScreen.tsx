import React, {useState} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {AppNavigationProps} from '../../../../navigation/routes';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import {
  showToast,
  Button,
  TextNavigation,
  TextInputField,
  Oops,
  ListItem,
  CustomPickerControlled,
} from '../../../../components';
import {useForm} from 'react-hook-form';
import {styleAppointmentBookingScreen as style} from './style';
import {pic_appointmentColor, pic_calendar} from '../../../../../assets';
import {
  AppointmentBookingSchema,
  dateWithFormat,
  dateWithoutFormat,
  palette,
} from '../../../../utils';
import {observer} from 'mobx-react-lite';
import {AppointmentBookingType, useStores} from '../../../../models';
import {SafeAreaView} from 'react-native-safe-area-context';

export const AppointmentScreen = observer(
  ({navigation}: AppNavigationProps<'Appointment'>) => {
    const [date, setDate] = useState<Date>(new Date());
    const [isVisible, setVisible] = useState(false);

    const {appointmentStore, authStore, userStore} = useStores();

    const token: string = authStore.token;
    const userRole: string = authStore.role;
    const userID: string | number = authStore.userID;
    const fullname: string = userStore.fullname;
    const phone: string = userStore.phone;

    interface AppointmentBookingFormProps {
      description: string;
      clinicId: string | number;
      nameOfClinic: string;
    }

    const toggleModal = () => {
      setVisible(!isVisible);
    };

    const {control, handleSubmit} = useForm<AppointmentBookingFormProps>({
      mode: 'onSubmit',
      resolver: AppointmentBookingSchema,
    });

    const onSubmitAppointment = async (data: AppointmentBookingFormProps) => {
      try {
        let appointmentStartTime: string = dateWithoutFormat(date);
        let nameOfPatient: string = fullname;
        let phoneOfPatient: string = phone;
        let patientId: string | number = userID;
        let AppointmentData: AppointmentBookingType = {
          ...data,
          appointmentStartTime,
          nameOfPatient,
          phoneOfPatient,
          patientId,
        };
        await appointmentStore.bookAppointment(token, AppointmentData);
        showToast('Successfully booking appointment');
      } catch (error) {
        showToast('Something went wrong');
      }
    };

    if (userRole === 'ROLE_PATIENT') {
      return (
        <SafeAreaView edges={['bottom']} style={style.container}>
          <ScrollView style={style.scrollView}>
            <View style={style.container2}>
              <Image style={style.image} source={pic_appointmentColor} />
              <Text style={[style.textAlignCenter, style.textBigBoldBlack]}>
                Book new appointment
              </Text>
              <ListItem
                style={[style.buttonNoColor, style.shadowGray]}
                onPress={toggleModal}
                activeOpacity={0.8}
                isMultipleAtrribute={false}
                imageSource={pic_calendar}>
                <Text style={[style.textAlignCenter, style.textNormalBlack]}>
                  Choose Time Slot
                </Text>
              </ListItem>

              <Text style={[style.textAlignCenter, style.textSmallNormalBlack]}>
                Time Slot: {dateWithFormat(date, 'ddd, MMM D, YYYY HH:mm')}
              </Text>
              <TextInputField
                placeholder="Description"
                placeholderTextColor="#9FA5AA"
                multiline={false}
                name="description"
                controller={control}
                isErrorField={true}
              />
              <CustomPickerControlled
                name="nameOfClinic"
                placeholder={'Choose Clinic'}
                data={['Clinic 01', 'Clinic 02']}
                styleModal={style.modalContainer}
                label={'Clinic Name'}
                dropdownIconColor={palette.lightGrey}
                controller={control}
                isErrorField={true}
              />
              <CustomPickerControlled
                name="clinicId"
                placeholder={'Choose Clinic ID'}
                data={['21', '22']}
                styleModal={style.modalContainer}
                label={'Clinic ID'}
                dropdownIconColor={palette.lightGrey}
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
                onPress={() => navigation.navigate('AppointmentList')}
                text="View My Appointments"
              />
            </View>
            <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
              <View style={style.modal}>
                <Text
                  style={[style.textAlignCenter, style.textNormalBoldBlack]}>
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
        </SafeAreaView>
      );
    } else {
      return <Oops text="For Patient" />;
    }
  },
);
