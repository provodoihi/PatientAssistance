import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import {AppNavigationProps} from '../../../navigation/Routes';
import {
  responsiveScreenFontSize as rf,
  responsiveScreenHeight as rh,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import {API_List} from '../../../API/apiList';
import HeaderBar from '../../../components/HeaderBar';
import showToastFail from '../../../components/ToastMessage';

const AdminLocationAddScreen = ({
  route,
}: AppNavigationProps<'AdminLocationAdd'>) => {
  // data for create location submit
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const locationData = {
    name: name,
    address: address,
    phone: phone,
    speciality: specialty,
    description: description,
    latitude: latitude,
    longtitude: longitude,
  };

  const submit = () => {
    if (
      name === '' ||
      address === '' ||
      phone === '' ||
      specialty === '' ||
      description === '' ||
      latitude === '' ||
      longitude === ''
    ) {
      Alert.alert('Notification', 'Please fill in answer details', [
        {
          text: 'OK',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
    } else {
      axios
        .post(API_List.adminLocationGeneral, locationData, {
          headers: {
            Authorization: `Bearer ${route.params.token}`,
          },
        })
        .then(() => {
          Alert.alert('Notification', 'Add location successfully', [
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

  return (
    <View style={styles.container}>
      <HeaderBar text="Location Management" isBack={true} />
      <ScrollView style={styles.scroll}>
        <View style={styles.container2}>
          <Image
            style={styles.img}
            source={require('../../../../assets/Image_Icon/location_color.png')}
          />
          <Text style={[styles.txt, styles.txtName]}>Add Location</Text>
          <TextInput
            style={styles.txtInput}
            onChangeText={text => {
              setName(text);
            }}
            value={name}
            placeholder="Name"
            placeholderTextColor="#9FA5AA"
            multiline={false}
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={text2 => {
              setAddress(text2);
            }}
            value={address}
            placeholder="Address"
            placeholderTextColor="#9FA5AA"
            multiline={false}
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={text3 => {
              setPhone(text3);
            }}
            value={phone}
            placeholder="Phone"
            placeholderTextColor="#9FA5AA"
            keyboardType="phone-pad"
            multiline={false}
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={text4 => {
              setSpecialty(text4);
            }}
            value={specialty}
            placeholder="Specialty"
            placeholderTextColor="#9FA5AA"
            multiline={false}
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={text5 => {
              setDescription(text5);
            }}
            value={description}
            placeholder="Description"
            placeholderTextColor="#9FA5AA"
            multiline={false}
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={text6 => {
              setLatitude(text6);
            }}
            value={latitude}
            placeholder="Latitude"
            placeholderTextColor="#9FA5AA"
            keyboardType="numeric"
            multiline={false}
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={text7 => {
              setLongitude(text7);
            }}
            value={longitude}
            placeholder="Longitude"
            placeholderTextColor="#9FA5AA"
            keyboardType="numeric"
            multiline={false}
          />
          <TouchableOpacity
            style={[styles.button, styles.shadow]}
            activeOpacity={0.8}
            onPress={submit}>
            <Text style={[styles.txt, styles.txtButton]}>
              Add This Location
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  headerBar: {
    flexDirection: 'row',
    flex: 0.07,
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  container2: {
    flex: 1,
    height: rh(110),
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  topScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.1,
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

  txtName: {
    margin: '2%',
    fontWeight: 'bold',
    fontSize: rf(2.5),
    color: '#4c4c4c',
  },

  txtHeader: {
    margin: '1%',
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  txtRole: {
    margin: '1%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#4c4c4c',
  },

  txtButton: {
    fontSize: rf(2.4),
    padding: '2.5%',
    margin: '2%',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  button: {
    backgroundColor: '#00BFFF',
    margin: '2%',
    borderRadius: 25,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button2: {
    margin: '1%',
  },

  row: {
    flexDirection: 'row',
    // flex: 1,
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
    width: '30%',
    height: '25%',
    resizeMode: 'contain',
  },
});

export default AdminLocationAddScreen;
