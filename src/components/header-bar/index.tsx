import {
  useNavigation,
  CommonActions,
  DrawerActions,
} from '@react-navigation/native';
import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useStores} from '../../models';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {palette, scale} from '../../utils';

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

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.headerBar}>
      {isBack === true ? (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={palette.black} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={toggleDrawer}
          activeOpacity={0.8}>
          <MaterialCommunityIcons name="menu" size={24} color={palette.black} />
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
        <Icon name="logout" size={24} color={palette.black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    flex: 0.07,
    margin: '1%',
    marginHorizontal: '3%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textHeader: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: scale(2.2),
    margin: '1%',
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  button: {
    margin: '1%',
  },
});
