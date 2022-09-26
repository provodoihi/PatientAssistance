import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import {API_LIST} from '../../utils/api-list';
import axios from 'axios';
import {AppNavigationProps} from '../../navigation/routes';
import {HeaderBar, showToastLong} from '../../components';
import {pic_qaColor, pic_answer, pic_notFound} from '../../../assets';
import Modal from 'react-native-modal';

const AdvisorAnswerListScreen = ({
  route,
}: AppNavigationProps<'AdvisorAnswerList'>) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0);
  const [itemId, setItemId] = useState('');

  // for modal + update delete founction
  const [isVisible, setVisible] = useState(false);
  const [answerUpdate, setAnswerUpdate] = useState('');

  useEffect(() => {
    const getAnswer = async () => {
      try {
        let response = await axios.get(API_LIST.answerAdvisor, {
          headers: {
            Authorization: `Bearer ${route.params.token}`,
          },
        });
        setData(response.data);
        setStatus(response.status);
      } catch (error) {
        console.log(error);
      }
    };
    getAnswer();
  }, [route.params.token]);

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  const openModal = () => {
    setVisible(true);
  };

  const answerNew = {
    answerDetail: answerUpdate,
  };

  const submitUpdate = () => {
    if (answerUpdate === '') {
      Alert.alert('Notification', 'Please fill in answer update details', [
        {
          text: 'OK',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
    } else {
      axios
        .put(API_LIST.answerAdvisor + itemId, answerNew, {
          headers: {
            Authorization: `Bearer ${route.params.token}`,
          },
        })
        .then(() => {
          Alert.alert('Notification', 'Update answer successfully', [
            {
              text: 'OK',
              onPress: () => setVisible(false),
              style: 'cancel',
            },
          ]);
        })
        .catch(() => {
          showToastLong('Something went wrong');
        });
    }
  };

  const submitDelete = () => {
    axios
      .delete(API_LIST.answerAdvisor + itemId, {
        headers: {
          Authorization: `Bearer ${route.params.token}`,
        },
      })
      .then(() => {
        Alert.alert('Notification', 'Delete answer successfully', [
          {
            text: 'OK',
            onPress: () => setVisible(false),
            style: 'cancel',
          },
        ]);
      })
      .catch(() => {
        showToastLong('Something went wrong');
      });
  };

  return (
    <View style={styles.container}>
      <HeaderBar text="For Health Advisor" isBack={true} />
      <View style={styles.container2}>
        <View style={styles.topScreen}>
          <Image style={styles.img} source={pic_qaColor} />
          <Text style={[styles.txt, styles.txtTitle]}>
            Your Answers To Questions
          </Text>
        </View>
        {status === 200 ? (
          <View style={styles.midScreen}>
            <FlatList
              data={data}
              renderItem={({item}: any) => {
                return (
                  <TouchableOpacity
                    style={[styles.button, styles.shadow]}
                    activeOpacity={0.8}
                    onPressIn={() => setItemId(item.id)}
                    onPress={openModal}>
                    <View style={styles.rowButton}>
                      <Image style={styles.iconButton} source={pic_answer} />

                      <View style={styles.col}>
                        <Text style={styles.txtName}>
                          Question: {item.questionDetail}
                        </Text>
                        <Text style={styles.txtNormal2}>
                          Answer: {item.answerDetail}
                        </Text>
                        <Text style={styles.txtNormal2}>
                          To Patient ID: {item.userId}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        ) : (
          <View style={styles.midScreen}>
            <Image style={styles.img} source={pic_notFound} />
            <Text style={styles.txtNotfound}>Not found</Text>
          </View>
        )}
        <Modal
          isVisible={isVisible}
          avoidKeyboard={true}
          onBackdropPress={() => setVisible(false)}>
          <View style={styles.modal}>
            <Text style={styles.txtModalHead}>Answer Detail</Text>
            <Text style={styles.txtModal}>Answer ID: {itemId}</Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={text => {
                setAnswerUpdate(text);
              }}
              value={answerUpdate}
              placeholder="Answer Update"
              placeholderTextColor="#9FA5AA"
              multiline={false}
            />
            <TouchableOpacity
              style={[styles.buttonModal, styles.shadow]}
              activeOpacity={0.8}
              onPress={submitUpdate}>
              <Text style={[styles.txt, styles.txtButtonModal]}>
                Update This Answer
              </Text>
            </TouchableOpacity>
            <Text style={styles.txtModalHead}>OR</Text>
            <TouchableOpacity
              style={[styles.buttonModal, styles.shadow]}
              activeOpacity={0.8}
              onPress={submitDelete}>
              <Text style={[styles.txt, styles.txtButtonModal]}>
                Delete This Answer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonModal, styles.shadow]}
              activeOpacity={0.8}
              onPress={toggleModal}>
              <Text style={[styles.txt, styles.txtButtonModal]}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    backgroundColor: '#ffffff',
  },

  topScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4,
  },

  midScreen: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#ffffff',
  },

  modal: {
    backgroundColor: '#ffffff',
    flex: 0.75,
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
    // alignSelf: 'center',
  },

  txtButtonModal: {
    padding: '2.5%',
    margin: '2%',
    fontSize: rf(2.2),
    fontWeight: 'bold',
    color: '#ffffff',
    alignSelf: 'center',
  },

  txtModalHead: {
    margin: '2%',
    fontSize: rf(2.2),
    fontWeight: 'bold',
    color: '#4c4c4c',
    textAlign: 'center',
  },

  txtModal: {
    margin: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#4c4c4c',
    // textAlign: 'center',
    alignSelf: 'center',
  },

  txtNormal2: {
    padding: '1.5%',
    margin: '1%',
    fontSize: rf(1.6),
    fontWeight: 'normal',
    color: '#4c4c4c',
  },

  txtName: {
    padding: '1.5%',
    margin: '1%',
    fontSize: rf(1.8),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  txtButton: {
    padding: '4%',
    margin: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#4c4c4c',
    // alignSelf: 'center',
  },

  txtButtonSmall: {
    fontSize: rf(1.8),
    padding: '5%',
    fontWeight: 'normal',
    color: '#ffffff',
  },

  button: {
    margin: '2.5%',
    marginBottom: '10%',
    width: '90%',
    borderRadius: 24,
    justifyContent: 'center',
    alignSelf: 'center',
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

  buttonModal: {
    backgroundColor: '#00BFFF',
    margin: '3%',
    borderRadius: 25,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rowButton: {
    flexDirection: 'row',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  col: {
    flexDirection: 'column',
    margin: '1%',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    maxWidth: '80%',
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

  row2: {
    flex: 0.75,
  },

  iconButton: {
    width: '15%',
    height: '50%',
    margin: '1.5%',
    resizeMode: 'contain',
  },
});

export default AdvisorAnswerListScreen;
