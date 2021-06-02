import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {CommonActions, DrawerActions} from '@react-navigation/native';
import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  text: string;
}

const HeaderBar = ({text}: Props) => {
  const navigation = useNavigation();

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
    <View style={styles.headerBar}>
      <TouchableOpacity
        style={styles.button2}
        activeOpacity={0.8}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Icon name="menu" size={24} />
      </TouchableOpacity>
      <Text style={[styles.txt, styles.txtHeader]}>{text}</Text>
      <TouchableOpacity
        style={styles.button2}
        activeOpacity={0.8}
        onPress={() =>
          Alert.alert('Notification', 'Are you sure to exit the app?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: clearAll},
          ])
        }>
        <Icon name="logout" size={24} />
      </TouchableOpacity>
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

  txt: {
    textAlign: 'center',
    justifyContent: 'center',
  },

  txtHeader: {
    margin: '1%',
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  button2: {
    margin: '1%',
  },
});

export default HeaderBar;
