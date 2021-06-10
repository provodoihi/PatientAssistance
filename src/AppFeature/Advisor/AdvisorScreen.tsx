import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {AppNavigationProps} from '../../navigation/Routes';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import HeaderBar from '../../components/HeaderBar';
import Oops from '../../components/Oops';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdvisorScreen = ({navigation}: AppNavigationProps<'Advisor'>) => {
  const [token, setToken] = useState('');
  const [fullname, setFullName] = useState('');
  const [userRole, setUserRole] = useState('');

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
        }
      } catch (e) {
        console.log('Error');
      }
    };
    getData();
  }, [fullname, token, userRole]);

  if (userRole === 'ROLE_ADVISOR') {
    return (
      <View style={styles.container}>
        <HeaderBar text="For Health Advisor" />
        <View style={styles.container2}>
          <View style={styles.topScreen}>
            <Text style={[styles.txt, styles.txtWelcome]}>
              Welcome {fullname}
            </Text>
            <View style={styles.row}>
              <View style={styles.div1}>
                <Text style={[styles.txt, styles.txtNormal]}>
                  Have a nice day
                </Text>
                <TouchableOpacity
                  style={styles.buttonSmall}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('Profile', {
                      token: token,
                      name: fullname,
                      role: userRole,
                    })
                  }>
                  <Text style={[styles.txt, styles.txtButtonSmall]}>
                    View my profile
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                style={styles.img}
                source={require('../../../assets/Image_Icon/counselling.png')}
              />
            </View>
          </View>

          <View style={styles.midScreen}>
            <Text style={styles.txtMid}>What will you do?</Text>
            <TouchableOpacity
              style={[styles.button, styles.shadow]}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('AdvisorQuestionList', {token: token})
              }>
              <View style={styles.rowButton}>
                <Image
                  style={styles.iconButton}
                  source={require('../../../assets/Image_Icon/help.png')}
                />
                <Text style={styles.txtButton}>View Questions</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.shadow]}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('AdvisorAnswer', {token: token})
              }>
              <View style={styles.rowButton}>
                <Image
                  style={styles.iconButton}
                  source={require('../../../assets/Image_Icon/answer.png')}
                />
                <Text style={styles.txtButton}>Answer Questions</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.shadow]}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('AdvisorAnswerList', {token: token})
              }>
              <View style={styles.rowButton}>
                <Image
                  style={styles.iconButton}
                  source={require('../../../assets/Image_Icon/qa_nocolor.png')}
                />
                <Text style={styles.txtButton}>Manage Answers</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return <Oops text="For Advisor" />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container2: {
    flex: 0.93,
    backgroundColor: '#fff',
  },

  topScreen: {
    backgroundColor: '#00BFFF',
    flex: 0.28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  midScreen: {
    flex: 0.72,
    justifyContent: 'center',
    alignItems: 'center',
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

  txt: {
    textAlign: 'center',
    justifyContent: 'center',
  },

  txtHeader: {
    margin: '1%',
    fontWeight: 'bold',
    color: '#4c4c4c',
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
    marginLeft: '4%',
    marginTop: '0%',
    fontSize: rf(2.7),
    fontWeight: 'bold',
    color: '#4c4c4c',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
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
    width: '30%',
    height: '75%',
    resizeMode: 'contain',
  },

  iconButton: {
    width: '20%',
    height: '75%',
    margin: '1.5%',
    resizeMode: 'contain',
  },
});

export default AdvisorScreen;
