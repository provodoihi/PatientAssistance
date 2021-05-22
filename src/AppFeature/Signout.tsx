import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {AppNavigationProps} from '../navigation/Routes';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CommonActions, DrawerActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signout = ({navigation}: AppNavigationProps<'Signout'>) => {
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      navigation.dispatch(
        CommonActions.reset({index: 0, routes: [{name: 'Auth'}]}),
      );
    } catch (e) {
      // clear error
    }
    console.log('Done.');
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignContent: 'flex-start',
          justifyContent: 'flex-start',
        }}>
        <TouchableOpacity
          style={styles.button2}
          activeOpacity={0.8}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Icon name="menu" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          activeOpacity={0.8}
          onPress={clearAll}>
          <Text style={[styles.txt, styles.txtButton]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  container2: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  txt: {
    margin: '1.5%',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  txtButton: {
    fontSize: rf(2.6),
    padding: '2.5%',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  txtHead: {
    padding: '1.5%',
    fontSize: rf(2.7),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  txtNavigate: {
    padding: '1.5%',
    fontSize: rf(1.8),
    fontWeight: 'normal',
    color: '#00BFFF',
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
    margin: '2.5%',
  },

  img2: {
    resizeMode: 'contain',
  },

  shadow: {
    shadowColor: '#00BFFF',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
});

export default Signout;
