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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Oops from '../../components/Oops';
import axios from 'axios';
import {API_List} from '../../API';
import {showToastFail, HeaderBar} from '../../components';

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

  const questionData = {
    userId: userID,
    fullname: fullname,
    phone: phone,
    questionDetail: question,
  };

  const submitQuestion = () => {
    if (question === '') {
      Alert.alert('Notification', 'Please write the question', [
        {
          text: 'OK',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
    } else {
      axios
        .post(API_List.question, questionData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          Alert.alert(
            'Notification',
            'Successfully. Your question will be answer soon',
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

  if (userRole === 'ROLE_PATIENT') {
    return (
      <View style={styles.container}>
        <HeaderBar text="Health Advice" isBack={true} />
        <View style={styles.container2}>
          <Image
            style={styles.img}
            source={require('../../../assets/Image_Icon/qa_color.png')}
          />
          <Text style={[styles.txt, styles.txtTitle]}>
            Ask questions to our health experts
          </Text>
          <TextInput
            style={styles.txtInput}
            onChangeText={text => {
              setQuestion(text);
            }}
            value={question}
            placeholder="Question"
            placeholderTextColor="#9FA5AA"
            multiline={false}
          />
          <TouchableOpacity
            style={[styles.button, styles.shadow]}
            activeOpacity={0.8}
            onPress={submitQuestion}>
            <Text style={[styles.txt, styles.txtButton]}>Submit Question</Text>
          </TouchableOpacity>
          <Text style={[styles.txt, styles.txtTitle]}>OR</Text>
          <TouchableOpacity
            style={[styles.button, styles.shadow]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('QAList', {token: token})}>
            <Text style={[styles.txt, styles.txtButton]}>
              View answers of my questions
            </Text>
          </TouchableOpacity>
        </View>
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
    fontSize: rf(2.2),
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

  button2: {
    margin: '1%',
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

export default HealthAdvisorScreen;
