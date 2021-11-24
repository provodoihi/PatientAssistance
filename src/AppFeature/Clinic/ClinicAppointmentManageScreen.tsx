import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {AppNavigationProps} from '../../navigation/Routes';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import HeaderBar from '../../components/HeaderBar';
import {API_List} from '../../API/apiList';
import showToastFail from '../../components/ToastMessage';

const ClinicAppointmentManageScreen = ({
  route,
}: AppNavigationProps<'ClinicAppointmentManage'>) => {
  const [appointmentID, setAppointmentID] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState('');

  const Status = {
    status: appointmentStatus,
  };

  const updateAppointment = () => {
    if (appointmentID === '' || appointmentStatus === '') {
      Alert.alert(
        'Notification',
        'Please fill the appointment update details',
        [
          {
            text: 'OK',
            onPress: () => null,
            style: 'cancel',
          },
        ],
      );
    } else {
      axios
        .patch(API_List.appointmentGeneral + appointmentID, Status, {
          headers: {
            Authorization: `Bearer ${route.params.token}`,
          },
        })
        .then(() => {
          Alert.alert('Notification', 'Update Appointment Successfully', [
            {
              text: 'OK',
              onPress: () => null,
              style: 'cancel',
            },
          ]);
        })
        .catch(() => {
          showToastFail();
        });
    }
  };

  const deleteAppointment = () => {
    axios
      .delete(API_List.appointmentGeneral + appointmentID, {
        headers: {
          Authorization: `Bearer ${route.params.token}`,
        },
      })
      .then(() => {
        Alert.alert('Notification', 'Delete Appointment Successfully', [
          {
            text: 'OK',
            onPress: () => null,
            style: 'cancel',
          },
        ]);
      })
      .catch(() => {
        showToastFail();
      });
  };

  return (
    <View style={styles.container}>
      <HeaderBar text="For Clinic" isBack={true} />
      <View style={styles.container2}>
        <Image
          style={styles.img}
          source={require('../../../assets/Image_Icon/appointment_color.png')}
        />
        <Text style={[styles.txt, styles.txtTitle]}>
          Appointment Management
        </Text>
        <TextInput
          style={styles.txtInput}
          onChangeText={text => {
            setAppointmentID(text);
          }}
          value={appointmentID}
          placeholder="Appointment ID"
          keyboardType="numeric"
          placeholderTextColor="#9FA5AA"
          multiline={false}
        />
        <Picker
          onValueChange={value => setAppointmentStatus(value)}
          selectedValue={appointmentStatus}
          style={styles.pick}
          dropdownIconColor="#9FA5AA">
          <Picker.Item label="Choose status update" value="" />
          <Picker.Item label="Confirm appointment" value="CONFIRMED" />
          <Picker.Item label="Cancel Appointment" value="CANCELED" />
        </Picker>
        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          activeOpacity={0.8}
          onPress={updateAppointment}>
          <Text style={[styles.txt, styles.txtButton]}>
            Update This Appointment Status
          </Text>
        </TouchableOpacity>
        <Text style={[styles.txt, styles.txtTitle]}>OR</Text>
        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          activeOpacity={0.8}
          onPress={deleteAppointment}>
          <Text style={[styles.txt, styles.txtButton]}>
            Delete This Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container2: {
    flex: 0.93,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtInput: {
    fontSize: rf(1.8),
    fontWeight: 'normal',
    color: '#4c4c4c',
    textAlign: 'left',
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '80%',
    margin: '2%',
    paddingLeft: '4%',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 25,
  },

  txt: {
    textAlign: 'center',
    justifyContent: 'center',
  },

  txtTitle: {
    margin: '2%',
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: '#4c4c4c',
    textAlign: 'center',
  },

  txtNotfound: {
    margin: '2%',
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: '#4c4c4c',
    textAlign: 'center',
  },

  txtNormal: {
    padding: '1.5%',
    margin: '2%',
    fontSize: rf(2),
    fontWeight: 'bold',
    color: '#ffffff',
    alignSelf: 'center',
  },

  txtButton: {
    padding: '2.5%',
    margin: '2%',
    fontSize: rf(2.1),
    fontWeight: 'bold',
    color: '#ffffff',
    alignSelf: 'center',
  },

  button: {
    backgroundColor: '#00BFFF',
    margin: '3%',
    borderRadius: 25,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pick: {
    color: '#9FA5AA',
    textAlign: 'left',
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '80%',
    margin: '2%',
    paddingLeft: '4%',
  },

  shadow: {
    shadowColor: '#00BFFF',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  img: {
    width: '35%',
    height: '30%',
    resizeMode: 'contain',
  },
});

export default ClinicAppointmentManageScreen;
