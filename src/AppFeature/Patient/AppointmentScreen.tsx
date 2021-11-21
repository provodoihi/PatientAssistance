import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {AppNavigationProps} from '../../navigation/Routes';
import {
  responsiveScreenFontSize as rf,
  responsiveScreenHeight as rh,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import HeaderBar from '../../components/HeaderBar';
import Oops from '../../components/Oops';
import {Picker} from '@react-native-picker/picker';
import {API_List} from '../../API/apiList';
import axios from 'axios';
import showToastFail from '../../components/ToastError';

const AppointmentScreen = ({
  navigation,
  route,
}: AppNavigationProps<'Appointment'>) => {
  const [describe, setDescribe] = useState('');
  const [userID, setUserID] = useState('');
  const [phone, setPhone] = useState('');
  const [clinic, setClinic] = useState('');
  const [clinicID, setClinicID] = useState('');
  const [date, setDate] = useState(new Date());
  const [token, setToken] = useState(route.params.token);
  const [fullname, setFullName] = useState(route.params.name);
  const [userRole, setUserRole] = useState(route.params.role);

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

  const appointmentData = {
    appointmentStartTime: date,
    description: describe,
    clinicId: clinicID,
    patientId: userID,
    nameOfClinic: clinic,
    nameOfPatient: fullname,
    phoneOfPatient: phone,
  };

  const submitAppointment = () => {
    if (describe === '') {
      Alert.alert('Notification', 'Please write the description', [
        {
          text: 'OK',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
    } else {
      axios
        .post(API_List.appointmentGeneral, appointmentData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          Alert.alert('Notification', 'Successfully booking appointment', [
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

  if (userRole === 'ROLE_PATIENT') {
    return (
      <View style={styles.container}>
        <HeaderBar text="Appointment" isBack={false} />

        <ScrollView style={styles.container2}>
          <View style={styles.child}>
            <Image
              style={styles.img}
              source={require('../../../assets/Image_Icon/appointment_color.png')}
            />
            <Text style={[styles.txt, styles.txtTitle]}>
              Book new appointment
            </Text>
            <Text style={[styles.txt, styles.txtNormal]}>
              Choose appointment time
            </Text>
            <DatePicker
              date={date}
              minimumDate={new Date(Date.now())}
              onDateChange={setDate}
              style={styles.datePick}
            />
            <TextInput
              style={styles.txtInput}
              onChangeText={text => {
                setDescribe(text);
              }}
              value={describe}
              placeholder="Description"
              placeholderTextColor="#9FA5AA"
              multiline={false}
            />
            <Picker
              style={styles.pick}
              dropdownIconColor="#9FA5AA"
              selectedValue={clinic}
              onValueChange={value => setClinic(value)}>
              <Picker.Item label="Choose Clinic" value="" />
              <Picker.Item label="Clinic 01" value="Clinic 01" />
              <Picker.Item label="Clinic 02" value="Clinic 02" />
            </Picker>
            <Picker
              style={styles.pick}
              dropdownIconColor="#9FA5AA"
              selectedValue={clinicID}
              onValueChange={value => setClinicID(value)}>
              <Picker.Item label=" Choose Clinic ID" value="" />
              <Picker.Item label="ID: 21 - Clinic 01" value="21" />
              <Picker.Item label="ID: 22 - Clinic 02" value="22" />
            </Picker>
            <TouchableOpacity
              style={[styles.button, styles.shadow]}
              activeOpacity={0.8}
              onPress={submitAppointment}>
              <Text style={[styles.txt, styles.txtButton]}>Book Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('AppointmentList', {
                  token: token,
                  userID: userID,
                })
              }>
              <Text style={[styles.txt, styles.txtNavigate]}>
                View My Appointments
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return <Oops text="For Patient" />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container2: {
    flex: 1,
  },

  child: {
    flex: 1,
    height: rh(105),
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

  txtNormal: {
    padding: '1.5%',
    margin: '2%',
    fontSize: rf(1.8),
    fontWeight: 'normal',
    color: '#4c4c4c',
    alignSelf: 'center',
  },

  txtButton: {
    fontSize: rf(2.4),
    padding: '2.5%',
    margin: '2%',
    fontWeight: 'bold',
    color: '#ffffff',
    alignSelf: 'center',
  },

  txtNavigate: {
    margin: '1.5%',
    padding: '1.5%',
    fontSize: rf(1.8),
    fontWeight: 'normal',
    color: '#00BFFF',
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

  datePick: {
    margin: '2%',
    height: rh(15),
  },

  button: {
    backgroundColor: '#00BFFF',
    margin: '2%',
    borderRadius: 25,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    // flex: 1,
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  rowButton: {
    flexDirection: 'row',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    height: '25%',
    resizeMode: 'contain',
  },
});

export default AppointmentScreen;
