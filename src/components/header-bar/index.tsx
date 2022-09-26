import {useNavigation, CommonActions} from '@react-navigation/native';
import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useStores} from '../../models';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeaderBarProps {
  text: string;
  isBack: boolean;
}

export const HeaderBar = ({text, isBack}: HeaderBarProps) => {
  const navigation = useNavigation();
  const {authStore} = useStores();

  const logOut = () => {
    authStore.signOut();
    navigation.dispatch(
      CommonActions.reset({index: 0, routes: [{name: 'Auth'}]}),
    );
  };

  return (
    <View style={styles.headerBar}>
      {isBack === true ? (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <MaterialCommunityIcons name="home-plus" size={28} />
        </TouchableOpacity>
      )}
      <Text style={styles.textHeader}>{text}</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() =>
          Alert.alert('Notification', 'Are you sure to exit the app?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: logOut},
          ])
        }>
        <Icon name="logout" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    flex: 0.07,
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textHeader: {
    textAlign: 'center',
    justifyContent: 'center',
    margin: '1%',
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  button: {
    margin: '1%',
  },
});
