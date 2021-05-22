import {DrawerActions} from '@react-navigation/routers';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppNavigationProps} from '../navigation/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const HomeScreen = ({navigation}: AppNavigationProps<'Home'>) => {
  const [fullname, setFullname] = useState('');
  const [userID, setUserId] = useState('');
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        const value2 = await AsyncStorage.getItem('username');
        const value3 = await AsyncStorage.getItem('userID');
        const value4 = await AsyncStorage.getItem('role');
        const value5 = await AsyncStorage.getItem('name');
        if (value5 !== null) {
          setFullname(value5);
        }
        if (value3 !== null) {
          setUserId(value3);
        }
        console.log(value + '\n' + value2 + '\n' + value4);
      } catch (e) {
        console.log('Error');
      }
    };
    getData();
  });

  return (
    <View style={{flex: 1}}>
      <View style={[styles.row, {flex: 0.06}]}>
        <TouchableOpacity
          style={styles.button2}
          activeOpacity={0.8}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Icon name="menu" size={24} />
        </TouchableOpacity>
        <Text
          style={{
            margin: '1%',
            textAlign: 'center',
            marginLeft: '32%',
            fontWeight: 'bold',
            color: '#4c4c4c',
          }}>
          Home
        </Text>
      </View>
      <ScrollView
        style={{flex: 0.94}}
        contentContainerStyle={{
          backgroundColor: '#fff',
          justifyContent: 'center',
        }}
        endFillColor="white">
        <View style={styles.container}>
          <View style={styles.topScreen}>
            <View style={{margin: 10, marginLeft: 25}}>
              <Text
                style={[
                  styles.txt,
                  styles.txt2,
                  {fontSize: 25, fontWeight: 'bold', color: '#205072'},
                ]}>
                Welcome {fullname}
              </Text>
              <Text
                style={[
                  styles.txt,
                  styles.txt2,
                  {fontSize: 13, fontWeight: 'normal', color: '#68B2A0'},
                ]}>
                Your id is {userID}
              </Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {width: '40%', backgroundColor: '#205072'},
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
                <TouchableOpacity
                  style={[
                    styles.button,
                    {width: '45%', backgroundColor: '#329D9C'},
                  ]}
                  activeOpacity={0.8}
                  onPress={() => {
                    console.log('a');
                  }}>
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
                    Test Async Storage
                  </Text>
                </TouchableOpacity>
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
          <View style={{height: 150}}></View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems:'center'
  },

  topScreen: {
    backgroundColor: '#E0ECDE',
    flex: 0.3,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  midScreen: {
    margin: 10,
    flex: 0.55,
  },

  botScreen: {
    flex: 0.1,
    width: 360,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  img: {
    margin: 5,
    resizeMode: 'contain',
  },

  txt: {
    fontFamily: 'Montserrat',
    justifyContent: 'center',
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
    margin: 5,
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

  img2: {
    resizeMode: 'contain',
  },
});

export default HomeScreen;
