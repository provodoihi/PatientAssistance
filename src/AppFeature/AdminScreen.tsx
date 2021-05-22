import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

const AdminScreen = () => {
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('role');
        if (value !== null) {
          setUserRole(value);
        }
        console.log(value);
      } catch (e) {
        console.log('Error');
      }
    };
    getData();
  });
  if (userRole === 'ROLE_ADMIN') {
    return (
      <View
        style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
        <ScrollView style={{flex: 0.9}} endFillColor="white">
          <View style={styles.container}>
            <View style={styles.topScreen}>
              <View style={{margin: 10, marginLeft: 25}}>
                <Text
                  style={[
                    styles.txt,
                    styles.txt2,
                    {fontSize: 25, fontWeight: 'bold', color: '#205072'},
                  ]}>
                  Location
                </Text>
                <Text
                  style={[
                    styles.txt,
                    styles.txt2,
                    {fontSize: 13, fontWeight: 'normal', color: '#68B2A0'},
                  ]}>
                  Your target for today is to keep positive mindset and smile to
                  everyone you meet.
                </Text>
                <View style={styles.row}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {width: '40%', backgroundColor: '#205072'},
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
                          color: 'white',
                          textAlign: 'center',
                        },
                      ]}>
                      MORE DETAILS
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {width: '45%', backgroundColor: '#329D9C'},
                    ]}
                    activeOpacity={0.8}
                    onPress={() => Alert.alert('aloo')}>
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
                      VIEW YOUR PROFILE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View>
        <Text>This function is only for admin ^^</Text>
      </View>
    );
  }
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
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0ECDE',
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
});

export default AdminScreen;
