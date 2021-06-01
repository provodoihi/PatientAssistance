import {DrawerActions} from '@react-navigation/routers';
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppNavigationProps} from '../navigation/Routes';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HealthAdvisorScreen = ({
  navigation,
  route,
}: AppNavigationProps<'HealthAdvisor'>) => {
  const [question, setQuestion] = useState('');
  const [userID, setUserID] = useState('');
  const [phone, setPhone] = useState('');
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

  const editdone = () => {
    Alert.alert('a');
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('userID');
        const value2 = await AsyncStorage.getItem('phone');
        if (value !== null) {
          setUserID(value);
        }
        if (value2 !== null) {
          setPhone(value2);
        }
      } catch (e) {
        console.log('Error');
      }
    };
    getData();
  }, []);

  if (userRole === 'ROLE_PATIENT') {
    return (
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity
            style={styles.button2}
            activeOpacity={0.8}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Icon name="menu" size={24} />
          </TouchableOpacity>
          <Text style={[styles.txt, styles.txtHeader]}>Health Advisor</Text>
        </View>
        <View style={styles.container2}>
          <View style={styles.topScreen}>
            <TextInput
              style={styles.txtInput}
              onChangeText={question => {
                setQuestion(question);
              }}
              value={question}
              onSubmitEditing={editdone}
              placeholder="Search here"
              placeholderTextColor="#9FA5AA"
              multiline={false}
            />
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity
            style={styles.button2}
            activeOpacity={0.8}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Icon name="menu" size={24} />
          </TouchableOpacity>
          <Text style={[styles.txt, styles.txtHeader]}>Admin</Text>
        </View>
        <View style={[styles.container2]}>
          <Image source={require('../../assets/oops.png')} style={styles.img} />
          <Text style={styles.txtOops}>This function for patient only</Text>
        </View>
      </View>
    );
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
    justifyContent: 'flex-start',
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
    marginLeft: '10%',
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
    shadowColor: '#a2a2a2',
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

export default HealthAdvisorScreen;
