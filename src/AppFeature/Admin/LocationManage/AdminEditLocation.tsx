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
import {AppNavigationProps} from '../../../navigation/Routes';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import axios from 'axios';
import {API_List} from '../../../API/apiList';
import HeaderBar from '../../../components/HeaderBar';
import showToastFail from '../../../components/ToastError';

const AdminLocationEditScreen = ({
  route,
}: AppNavigationProps<'AdminLocationEdit'>) => {
  // data for update location submit
  const [locationID, setLocationID] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const locationUpdateData = {
    address: address,
    phone: phone,
  };

  const submit = () => {
    if (locationID === '' || address === '' || phone === '') {
      Alert.alert('Notification', 'Please fill in answer details', [
        {
          text: 'OK',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
    } else {
      axios
        .post(API_List.adminLocationGeneral + locationID, locationUpdateData, {
          headers: {
            Authorization: `Bearer ${route.params.token}`,
          },
        })
        .then(() => {
          Alert.alert('Notification', 'Update location successfully', [
            {
              text: 'OK',
              onPress: () => null,
              style: 'cancel',
            },
          ]);
        })
        .catch(() => {
          Alert.alert('Notification', 'Something Went Wrong', [
            {
              text: 'OK',
              onPress: () => null,
              style: 'cancel',
            },
          ]);
        });
    }
  };

  const deleteLocation = () => {
    if (locationID === '') {
      Alert.alert('Notification', 'Please fill in Location ID', [
        {
          text: 'OK',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
    } else {
      axios
        .delete(API_List.adminLocationGeneral + locationID, {
          headers: {
            Authorization: `Bearer ${route.params.token}`,
          },
        })
        .then(() => {
          Alert.alert('Notification', 'Delete location successfully', [
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
      <View style={styles.container2}>
        <Image
          style={styles.img}
          source={require('../../../../assets/Image_Icon/location_color.png')}
        />
        <Text style={[styles.txt, styles.txtName]}>Edit Location</Text>
        <TextInput
          style={styles.txtInput}
          onChangeText={text => {
            setLocationID(text);
          }}
          value={locationID}
          placeholder="Location ID"
          placeholderTextColor="#9FA5AA"
          keyboardType="numeric"
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
        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          activeOpacity={0.8}
          onPress={submit}>
          <Text style={[styles.txt, styles.txtButton]}>
            Update This Location
          </Text>
        </TouchableOpacity>
        <Text style={[styles.txt, styles.txtName]}>OR</Text>
        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          activeOpacity={0.8}
          onPress={deleteLocation}>
          <Text style={[styles.txt, styles.txtButton]}>
            Delete This Location
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

  headerBar: {
    flexDirection: 'row',
    flex: 0.07,
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  container2: {
    flex: 0.93,
    backgroundColor: '#fff',
    justifyContent: 'center',
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

export default AdminLocationEditScreen;
