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
import {useTranslation} from 'react-i18next';

interface HeaderBarProps {
  text?: string;
  isBack?: boolean;
}

export const HeaderBar = ({text, isBack}: HeaderBarProps) => {
  const navigation = useNavigation();
  const {authStore} = useStores();
  const {t} = useTranslation();

  const logOut = async () => {
    await authStore.signOut();
    navigation.dispatch(
      CommonActions.reset({index: 0, routes: [{name: 'Auth'}]}),
    );
  };

  const backAction = () => {
    Alert.alert(t('backAction.title'), t('backAction.content'), [
      {
        text: t('common.cancel'),
        onPress: () => null,
        style: 'cancel',
      },
      {text: t('common.yes'), onPress: logOut},
    ]);
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
        onPress={backAction}>
        <Icon name="logout" size={24} color={palette.black} />
      </TouchableOpacity>
    </View>
  );
};

export const HeaderBarLeft = ({isBack}: HeaderBarProps) => {
  const navigation = useNavigation();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      {isBack === true ? (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={goBack}>
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
    </>
  );
};

export const HeaderBarRight = () => {
  const navigation = useNavigation();
  const {authStore} = useStores();
  const {t} = useTranslation();

  const logOut = async () => {
    await authStore.signOut();
    navigation.dispatch(
      CommonActions.reset({index: 0, routes: [{name: 'Auth'}]}),
    );
  };

  const backAction = () => {
    Alert.alert(t('backAction.title'), t('backAction.content'), [
      {
        text: t('common.cancel'),
        onPress: () => null,
        style: 'cancel',
      },
      {text: t('common.yes'), onPress: logOut},
    ]);
  };

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={backAction}>
      <Icon name="logout" size={24} color={palette.black} />
    </TouchableOpacity>
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
