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
import {API_List} from '../../API';
import axios from 'axios';
import {AppNavigationProps} from '../../navigation/Routes';
import {HeaderBar} from '../../components';

const HealthAdvisorListScreen = ({route}: AppNavigationProps<'QAList'>) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const getProfile = async () => {
      try {
        let response = await axios.get(API_List.answerPatient, {
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
    getProfile();
  }, [route.params.token]);

  return (
    <View style={styles.container}>
      <HeaderBar text="Health Advisor" isBack={true} />
      <View style={styles.container2}>
        <View style={styles.topScreen}>
          <Image
            style={styles.img}
            source={require('../../../assets/Image_Icon/qa_color.png')}
          />
          <Text style={[styles.txt, styles.txtTitle]}>
            Your Questions Answers
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
                    activeOpacity={1}>
                    <View style={styles.rowButton}>
                      <Image
                        style={styles.iconButton}
                        source={require('../../../assets/Image_Icon/answer.png')}
                      />

                      <View style={styles.col}>
                        <Text style={styles.txtName}>
                          Question: {item.questionDetail}
                        </Text>
                        <Text style={styles.txtNormal2}>
                          Answer: {item.answerDetail}
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

  txtButtonSmall: {
    fontSize: rf(1.8),
    padding: '5%',
    fontWeight: 'normal',
    color: '#ffffff',
  },

  button: {
    margin: '2.5%',
    marginBottom: '8%',
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

  button2: {
    margin: '1%',
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

export default HealthAdvisorListScreen;
