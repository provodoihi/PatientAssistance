import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import {API_List} from '../../API/apiList';
import axios from 'axios';
import {AppNavigationProps} from '../../navigation/Routes';
import HeaderBar from '../../components/HeaderBar';
import Modal from 'react-native-modal';
import showToastFail from '../../components/ToastError';
import ModalLoad from '../../components/ModalLoad';

const AppointmentListScreen = ({
  route,
}: AppNavigationProps<'AppointmentList'>) => {
  const [data, setData] = useState([]);
  const [statusRes, setStatusRes] = useState(0);
  const [itemId, setItemId] = useState(0);

  // for modal
  const [isVisibleLoad, setVisibleLoad] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [clinic, setClinic] = useState('');
  const [time, setTime] = useState('');
  const [describe, setDescribe] = useState('');
  const [statusAppoint, setStatusAppoint] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        let response = await axios.get(
          API_List.appointmentFindPatient + route.params.userID,
          {
            headers: {
              Authorization: `Bearer ${route.params.token}`,
            },
          },
        );
        setData(response.data);
        setStatusRes(response.status);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [route.params.token, route.params.userID]);

  const openModal = async () => {
    setVisibleLoad(true);
    try {
      let response = await axios.get(API_List.appointmentGeneral + itemId, {
        headers: {
          Authorization: `Bearer ${route.params.token}`,
        },
      });
      console.log(response.status);
      setClinic(response.data.nameOfClinic);
      setTime(response.data.appointmentStartTime);
      setDescribe(response.data.description);
      setStatusAppoint(response.data.status);
      setVisibleLoad(false);
      setVisible(true);
    } catch (error) {
      setVisibleLoad(false);
      showToastFail();
    }
  };

  const toggleModal = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <HeaderBar text="Appointment" isBack={true} />
      <View style={styles.container2}>
        <View style={styles.topScreen}>
          <Image
            style={styles.img}
            source={require('../../../assets/Image_Icon/appointment_color.png')}
          />
          <Text style={[styles.txt, styles.txtTitle]}>Your Appointments</Text>
        </View>

        {statusRes === 200 ? (
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
                      <Image
                        style={styles.iconButton}
                        source={require('../../../assets/Image_Icon/calendar.png')}
                      />

                      <View style={styles.col}>
                        <Text style={styles.txtName}>
                          Clinic: {item.nameOfClinic}
                        </Text>
                        <Text style={styles.txtNormal2}>
                          Time:{' '}
                          {new Date(item.appointmentStartTime).toUTCString()}
                        </Text>
                        <Text style={styles.txtNormal2}>
                          Status: {item.status}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
            <ModalLoad isVisibleLoad={isVisibleLoad} />
            <Modal
              isVisible={isVisible}
              onBackdropPress={() => setVisible(false)}>
              <View style={styles.modal}>
                <Text style={styles.txtModalHead}>Appointment Detail</Text>
                <Text style={styles.txtModal}>Clinic: {clinic}</Text>
                <Text style={styles.txtModal}>
                  Time: {new Date(time).toUTCString()}
                </Text>
                <Text style={styles.txtModal}>Description: {describe}</Text>
                <Text style={styles.txtModal}>Status: {statusAppoint}</Text>
                <TouchableOpacity
                  style={[styles.buttonModal, styles.shadow]}
                  activeOpacity={0.8}
                  onPress={toggleModal}>
                  <Text style={[styles.txt, styles.txtButtonModal]}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        ) : (
          <View style={styles.midScreen}>
            <Image
              style={styles.img}
              source={require('../../../assets/Image_Icon/notfound.png')}
            />
            <Text style={styles.txtNotfound}>Not found</Text>
          </View>
        )}
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

  div1: {
    flexDirection: 'column',
    margin: '1.5%',
    alignContent: 'center',
    justifyContent: 'center',
  },

  div2: {
    flex: 0.3,
  },

  modal: {
    backgroundColor: '#ffffff',
    flex: 0.65,
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
    alignSelf: 'flex-start',
  },

  txtButtonSmall: {
    fontSize: rf(1.8),
    padding: '5%',
    fontWeight: 'normal',
    color: '#ffffff',
  },

  button: {
    margin: '2.5%',
    marginBottom: '6%',
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
    width: '40%',
    height: '35%',
    resizeMode: 'contain',
  },

  row2: {
    flex: 0.75,
  },

  iconButton: {
    width: '16%',
    height: '50%',
    margin: '1.5%',
    resizeMode: 'contain',
  },
});

export default AppointmentListScreen;
