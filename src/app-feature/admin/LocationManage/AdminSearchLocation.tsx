import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import {AppNavigationProps} from '../../../navigation/routes';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import {API_LIST} from '../../../utils/api-list';
import axios from 'axios';
import {HeaderBar, ModalLoad} from '../../../components';
import {pic_notFound, pic_search, pic_hospital} from '../../../../assets';

export const Notfound = () => {
  return (
    <View style={styles.midScreen}>
      <Image style={styles.img} source={pic_notFound} />
      <Text style={styles.txtNotfound}>Not found</Text>
    </View>
  );
};

export const Init = () => {
  return (
    <View style={styles.midScreen}>
      <Image style={styles.img} source={pic_search} />
      <Text style={styles.txtMid}>Search locations</Text>
    </View>
  );
};

const AdminSearchLocationScreen = ({
  navigation,
  route,
}: AppNavigationProps<'AdminLocationSearch'>) => {
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0);
  const [isVisible, setVisible] = useState(false);

  const editdone = async () => {
    try {
      setVisible(true);
      let response = await axios.get(API_LIST.filterLocation + keyword);
      console.log(response.status);
      setStatus(response.status);
      setData(response.data);
      setVisible(false);
    } catch (error) {
      setVisible(false);
      Alert.alert('Notification', 'Something Went Wrong', [
        {
          text: 'OK',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar text="Location Management" isBack={true} />
      <View style={styles.container2}>
        <View style={styles.topScreen}>
          <TextInput
            style={styles.txtInput}
            onChangeText={text => {
              setKeyword(text);
            }}
            value={keyword}
            onSubmitEditing={editdone}
            placeholder="Search here"
            placeholderTextColor="#9FA5AA"
            multiline={false}
          />
        </View>
        <ModalLoad isVisibleLoad={isVisible} />
        {status === 200 ? (
          <View style={styles.midScreen}>
            <FlatList
              data={data}
              renderItem={({item}: any) => {
                return (
                  <TouchableOpacity
                    style={[styles.button, styles.shadow]}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate('AdminLocationEdit', {
                        token: route.params.token,
                      })
                    }>
                    <View style={styles.rowButton}>
                      <Image style={styles.iconButton} source={pic_hospital} />

                      <View style={styles.col}>
                        <Text style={styles.txtName}>{item.name}</Text>
                        <Text style={styles.txtName}>
                          Hospital ID: {item.id}
                        </Text>
                        <Text style={styles.txtNormal2}>{item.address}</Text>
                        <Text style={styles.txtNormal2}>{item.phone}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        ) : status === 204 ? (
          <Notfound />
        ) : (
          <Init />
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
    backgroundColor: '#fff',
  },

  topScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.1,
  },

  modal: {
    backgroundColor: '#ffffff',
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  midScreen: {
    flex: 0.9,
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
    marginBottom: '5%',
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
    width: '16%',
    height: '60%',
    margin: '1.5%',
    resizeMode: 'contain',
  },
});

export default AdminSearchLocationScreen;
