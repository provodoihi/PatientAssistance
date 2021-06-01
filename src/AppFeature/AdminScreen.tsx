import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppNavigationProps} from '../navigation/Routes';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';

const data = [
  {
    id: '1',
    job: 'Physician',
    name: 'Svyatoslav Taushev',
  },
  {
    id: '2',
    job: 'Physician',
    name: 'Svyatoslav Taushev',
  },
];

export {data};

const AdminScreen = ({navigation}: AppNavigationProps<'Admin'>) => {
  let userRole = '';
  if (userRole === 'ROLE_ADMIN') {
    return (
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity
            style={styles.button2}
            activeOpacity={0.8}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Icon name="menu" size={24} />
          </TouchableOpacity>
          <Text style={[styles.txt, styles.txtHeader]}>Dashboard</Text>
        </View>
        <ScrollView
          style={styles.roll}
          contentContainerStyle={styles.container2}
          endFillColor="white">
          <View style={styles.topScreen}>
            <Text style={[styles.txt, styles.txtWelcome]}>
              Welcome {userRole}
            </Text>
            <View>
              <View style={styles.row}>
                <View>
                  <Text
                    style={[
                      styles.txt,
                      styles.txt2,
                      {fontSize: 13, fontWeight: 'normal', color: '#68B2A0'},
                    ]}>
                    Have a nice day
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {width: '45%', backgroundColor: '#59ADFF'},
                    ]}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Location')}>
                    <Text
                      style={[
                        styles.txt,
                        {
                          padding: 5,
                          fontSize: 8,
                          fontWeight: 'bold',
                          color: 'white',
                          textAlign: 'center',
                        },
                      ]}>
                      Location
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.midScreen}>
            <Text
              style={[
                styles.txt,
                styles.txt2,
                {fontSize: 13, fontWeight: 'normal', color: '#205072'},
              ]}>
              What are you doing today?
            </Text>
            <View style={styles.row}>
              <View style={[styles.col]}>
                <Text
                  style={[
                    styles.txt,
                    {
                      padding: 5,
                      fontSize: 10,
                      fontWeight: 'normal',
                      color: '#205072',
                      opacity: 0.35,
                    },
                  ]}>
                  Doctors
                </Text>
                <Text
                  style={[
                    styles.txt,
                    {
                      padding: 5,
                      fontSize: 13,
                      fontWeight: 'normal',
                      color: '#205072',
                    },
                  ]}>
                  Brain Checkout
                </Text>
                <Text
                  style={[
                    styles.txt,
                    {
                      padding: 5,
                      fontSize: 11,
                      fontWeight: 'normal',
                      color: '#205072',
                      opacity: 0.35,
                    },
                  ]}>
                  Have an appointment today
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    width: '25%',
                    backgroundColor: '#F75010',
                    alignSelf: 'center',
                    flex: 0.15,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => Alert.alert('usr')}>
                <Text
                  style={[
                    styles.txt,
                    {
                      padding: 5,
                      fontSize: 8,
                      fontWeight: 'bold',
                      color: 'white',
                    },
                  ]}>
                  Alert test
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text
                  style={[
                    styles.txt,
                    {
                      padding: 5,
                      fontSize: 10,
                      fontWeight: 'normal',
                      color: '#205072',
                      opacity: 0.35,
                    },
                  ]}>
                  Pharmacy
                </Text>
                <Text
                  style={[
                    styles.txt,
                    {
                      padding: 5,
                      fontSize: 13,
                      fontWeight: 'normal',
                      color: '#205072',
                    },
                  ]}>
                  Purchase Prescription
                </Text>
                <Text
                  style={[
                    styles.txt,
                    {
                      padding: 5,
                      fontSize: 11,
                      fontWeight: 'normal',
                      color: '#205072',
                      opacity: 0.35,
                    },
                  ]}>
                  Don't forget to bring the list with you
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    width: '25%',
                    backgroundColor: '#F75010',
                    alignSelf: 'center',
                    flex: 0.15,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => Alert.alert('Test')}>
                <Text
                  style={[
                    styles.txt,
                    {
                      padding: 5,
                      fontSize: 8,
                      fontWeight: 'bold',
                      color: 'white',
                    },
                  ]}>
                  SET
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={[
                styles.txt,
                styles.txt2,
                {fontSize: 13, fontWeight: 'normal', color: '#205072'},
              ]}>
              Visit a Specialists
            </Text>
            <FlatList
              data={data}
              renderItem={({item}) => {
                return (
                  <View style={styles.shadow}>
                    <View
                      style={[
                        styles.row,
                        {backgroundColor: 'white', borderRadius: 10},
                      ]}>
                      <View style={styles.col}>
                        <Text
                          style={[
                            styles.txt,
                            {
                              padding: 5,
                              fontSize: 10,
                              fontWeight: 'normal',
                              color: '#205072',
                              opacity: 0.35,
                            },
                          ]}>
                          {item.job}
                        </Text>
                        <Text
                          style={[
                            styles.txt,
                            {
                              padding: 5,
                              fontSize: 13,
                              fontWeight: 'normal',
                              color: '#205072',
                            },
                          ]}>
                          {item.name}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.button,
                          {
                            width: '25%',
                            backgroundColor: 'white',
                            borderColor: '#CDB3D4',
                            borderWidth: 1,
                            alignSelf: 'center',
                            flex: 0.15,
                          },
                        ]}
                        activeOpacity={0.8}
                        onPress={() => Alert.alert('Button')}>
                        <Text
                          style={[
                            styles.txt,
                            {
                              padding: 5,
                              fontSize: 8,
                              fontWeight: 'bold',
                              color: '#CDB3D4',
                            },
                          ]}>
                          BOOK
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
              horizontal={true}
            />
          </View>
        </ScrollView>
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
        <View style={[styles.roll, styles.container2]}>
          <Image source={require('../../assets/oops.png')} style={styles.img} />
          <Text style={styles.txtOops}>This function for admin only</Text>
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

  roll: {
    flex: 0.93,
  },

  container2: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topScreen: {
    backgroundColor: '#00BFFF',
    flex: 0.3,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  midScreen: {
    flex: 0.7,
  },

  txt: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },

  txtOops: {
    margin: '1%',
    color: '#4c4c4c',
    fontWeight: 'bold',
    fontSize: rf(2.5),
  },

  txtHeader: {
    margin: '1%',
    marginLeft: '32%',
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  txtWelcome: {
    margin: '1.5%',
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'left',
  },

  txt2: {
    margin: 5,
    padding: 10,
    textAlign: 'left',
  },

  button: {
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    flex: 1,
    margin: '1%',
    alignItems: 'center',
  },

  col: {
    flexDirection: 'column',
    margin: 5,
    flex: 0.7,
    justifyContent: 'flex-start',
  },

  shadow: {
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },

  button2: {
    margin: '1%',
  },

  img: {
    resizeMode: 'contain',
    width: '35%',
    height: '35%',
  },
});

export default AdminScreen;
