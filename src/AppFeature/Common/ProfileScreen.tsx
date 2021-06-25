import React, {useEffect, useState} from 'react';
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
// import {API_List} from '../../API/apiList';
import {API_List_Company} from '../../API/apiListForCompany';
import HeaderBarBack from '../../components/HeaderBarBack';
import showToastFail from '../../components/ToastError';

const ProfileScreen = ({route}: AppNavigationProps<'Profile'>) => {
  const fullname = route.params.name;
  const token = route.params.token;
  const role = route.params.role;

  // init data for placeholder
  const [firstnameInit, setFirstname] = useState('');
  const [lastnameInit, setLastname] = useState('');
  const [ageInit, setAge] = useState('');
  const [addressInit, setAddress] = useState('');

  // data for update profile submit
  const [firstnameEdit, setFirstnameEdit] = useState('');
  const [lastnameEdit, setLastnameEdit] = useState('');
  const [ageEdit, setAgeEdit] = useState('');
  const [addressEdit, setAddressEdit] = useState('');

  const f1nameplace = `Firstname: ${firstnameInit}`;
  const f2nameplace = `Lastname: ${lastnameInit}`;
  const addressplace = `Address: ${addressInit}`;
  const ageplace = `Age: ${ageInit}`;

  const updateProfileData = {
    firstname: firstnameEdit,
    lastname: lastnameEdit,
    address: addressEdit,
    age: ageEdit,
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        let response = await axios.get(API_List_Company.myProfile, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setFirstname(response.data.firstname);
        setLastname(response.data.lastname);
        setAddress(response.data.address);
        setAge(response.data.age);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [token]);

  const submit = () => {
    if (
      firstnameEdit === '' ||
      lastnameEdit === '' ||
      addressEdit === '' ||
      ageEdit === ''
    ) {
      Alert.alert('Notification', 'Please fill in profile update details', [
        {
          text: 'OK',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
    } else {
      axios
        .put(API_List_Company.myProfile, updateProfileData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          Alert.alert(
            'Notification',
            'Upload profile successfully. The change will effect in the next time you use the app',
            [
              {
                text: 'OK',
                onPress: () => null,
                style: 'cancel',
              },
            ],
          );
        })
        .catch(() => {
          showToastFail();
        });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBarBack text="Profile" />
      <View style={styles.container2}>
        <Image
          style={styles.img}
          source={require('../../../assets/Image_Icon/user.png')}
        />
        <Text style={[styles.txt, styles.txtName]}>{fullname}</Text>
        <Text style={[styles.txt, styles.txtRole]}>{role}</Text>
        <TextInput
          style={styles.txtInput}
          onChangeText={firstnameEdit => {
            setFirstnameEdit(firstnameEdit);
          }}
          value={firstnameEdit}
          placeholder={f1nameplace}
          placeholderTextColor="#9FA5AA"
          multiline={false}
        />
        <TextInput
          style={styles.txtInput}
          onChangeText={lastnameEdit => {
            setLastnameEdit(lastnameEdit);
          }}
          value={lastnameEdit}
          placeholder={f2nameplace}
          placeholderTextColor="#9FA5AA"
          multiline={false}
        />
        <TextInput
          style={styles.txtInput}
          onChangeText={addressEdit => {
            setAddressEdit(addressEdit);
          }}
          value={addressEdit}
          placeholder={addressplace}
          placeholderTextColor="#9FA5AA"
          multiline={false}
        />
        <TextInput
          style={styles.txtInput}
          onChangeText={ageEdit => {
            setAgeEdit(ageEdit);
          }}
          value={ageEdit}
          placeholder={ageplace}
          placeholderTextColor="#9FA5AA"
          maxLength={3}
          keyboardType="number-pad"
          multiline={false}
        />
        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          activeOpacity={0.8}
          onPress={submit}>
          <Text style={[styles.txt, styles.txtButton]}>Update My Profile</Text>
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
    fontSize: rf(2.7),
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
    width: '25%',
    height: '25%',
    resizeMode: 'contain',
  },
});

export default ProfileScreen;
