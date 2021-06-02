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
import {AppNavigationProps} from '../navigation/Routes';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderBar from '../components/HeaderBar';
import Oops from '../components/Oops';

export const Notfound = () => {
  return (
    <View style={styles.midScreen}>
      <Image style={styles.img} source={require('../../assets/notfound.png')} />
      <Text style={styles.txtNotfound}>Not found</Text>
    </View>
  );
};

export const Init = () => {
  return (
    <View style={styles.midScreen}>
      <Image style={styles.img} source={require('../../assets/search.png')} />
      <Text style={styles.txtMid}>Search hospitals and clinics</Text>
    </View>
  );
};

const AppointmentScreen = ({
  navigation,
  route,
}: AppNavigationProps<'Appointment'>) => {
  const [keyword, setKeyword] = useState('');
  const userRole = route.params.role;

  const editdone = () => {
    Alert.alert('a');
  };

  if (userRole === 'ROLE_PATIENT') {
    return (
      <View style={styles.container}>
        <HeaderBar text="Appointment" />
        <View style={styles.container2}>
          <View style={styles.topScreen}>
            <TextInput
              style={styles.txtInput}
              onChangeText={keyword => {
                setKeyword(keyword);
              }}
              value={keyword}
              onSubmitEditing={editdone}
              placeholder="Search here"
              placeholderTextColor="#9FA5AA"
              multiline={false}
            />
          </View>
          {keyword === 'null' ? <Notfound /> : <Init />}
        </View>
      </View>
    );
  } else {
    return <Oops text="Patient" />;
  }
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

  midScreen: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  div1: {
    flexDirection: 'column',
    margin: '1.5%',
    alignContent: 'center',
    justifyContent: 'center',
  },

  div2: {
    flex: 0.3,
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

  txtHeader: {
    margin: '1%',
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  txtOops: {
    margin: '1%',
    color: '#4c4c4c',
    fontWeight: 'bold',
    fontSize: rf(2.5),
  },

  txtWelcome: {
    margin: '2%',
    marginLeft: '4%',
    fontSize: rf(2.7),
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'left',
  },

  txtMid: {
    margin: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#8B959E',
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
    padding: '4%',
    margin: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#4c4c4c',
    alignSelf: 'center',
  },

  txtButtonSmall: {
    fontSize: rf(1.8),
    padding: '5%',
    fontWeight: 'normal',
    color: '#ffffff',
  },

  button: {
    margin: '2.5%',
    width: '80%',
    borderRadius: 24,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  buttonSmall: {
    margin: '1.5%',
    width: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#59ADFF',
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

  rowButton: {
    flexDirection: 'row',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  col: {
    flexDirection: 'column',
    margin: 5,
    flex: 0.7,
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
    height: '35%',
    resizeMode: 'contain',
  },

  iconButton: {
    width: '20%',
    height: '75%',
    margin: '1.5%',
    resizeMode: 'contain',
  },
});

export default AppointmentScreen;
