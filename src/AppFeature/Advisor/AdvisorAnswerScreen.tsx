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
import {AppNavigationProps} from '../../navigation/routes';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import axios from 'axios';
import {API_List} from '../../utils/api-list';
import {HeaderBar, showToast} from '../../components';

const AdvisorAnswerScreen = ({route}: AppNavigationProps<'AdvisorAnswer'>) => {
  // data for update profile submit
  const [questionID, setQuestionID] = useState('');
  const [question, setQuestion] = useState('');
  const [patientID, setPatientID] = useState('');
  const [answer, setAnswer] = useState('');

  const answerData = {
    questionId: questionID,
    questionDetail: question,
    userId: patientID,
    answerDetail: answer,
  };

  const submit = () => {
    if (
      questionID === '' ||
      question === '' ||
      patientID === '' ||
      answer === ''
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
        .post(API_List.answerAdvisor, answerData, {
          headers: {
            Authorization: `Bearer ${route.params.token}`,
          },
        })
        .then(() => {
          Alert.alert('Notification', 'Create answer successfully', [
            {
              text: 'OK',
              onPress: () => null,
              style: 'cancel',
            },
          ]);
        })
        .catch(() => {
          showToast('Something went wrong');
        });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar text="For Health Advisor" isBack={true}/>
      <View style={styles.container2}>
        <Image
          style={styles.img}
          source={require('../../../assets/Image_Icon/qa_color.png')}
        />
        <Text style={[styles.txt, styles.txtName]}>
          Answer Questions From Patients
        </Text>
        <TextInput
          style={styles.txtInput}
          onChangeText={text => {
            setQuestionID(text);
          }}
          value={questionID}
          placeholder="Question ID"
          placeholderTextColor="#9FA5AA"
          keyboardType="numeric"
          multiline={false}
        />
        <TextInput
          style={styles.txtInput}
          onChangeText={text2 => {
            setQuestion(text2);
          }}
          value={question}
          placeholder="Question"
          placeholderTextColor="#9FA5AA"
          multiline={false}
        />
        <TextInput
          style={styles.txtInput}
          onChangeText={text3 => {
            setPatientID(text3);
          }}
          value={patientID}
          placeholder="To Patient ID"
          placeholderTextColor="#9FA5AA"
          keyboardType="numeric"
          multiline={false}
        />
        <TextInput
          style={styles.txtInput}
          onChangeText={text4 => {
            setAnswer(text4);
          }}
          value={answer}
          placeholder="Answer"
          placeholderTextColor="#9FA5AA"
          multiline={false}
        />
        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          activeOpacity={0.8}
          onPress={submit}>
          <Text style={[styles.txt, styles.txtButton]}>Answer</Text>
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

export default AdvisorAnswerScreen;
