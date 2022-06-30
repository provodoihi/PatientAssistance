import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {AppNavigationProps} from '../../navigation/routes';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import HeaderBar from '../../components/HeaderBar';

const AdminUserManageScreen = ({
  navigation,
  route,
}: AppNavigationProps<'AdminUserManage'>) => {
  return (
    <View style={styles.container}>
      <HeaderBar text="For Admin" isBack={true} />
      <View style={styles.container2}>
        <Image
          style={styles.img}
          source={require('../../../assets/Image_Icon/user_color.png')}
        />
        <Text style={[styles.txt, styles.txtName]}>User Management</Text>
        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('AdminUserFind', {token: route.params.token})
          }>
          <View style={styles.rowButton}>
            <Image
              style={styles.iconButton}
              source={require('../../../assets/Image_Icon/search.png')}
            />
            <Text style={styles.txtButton}>Search Users</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('AdminUserEdit', {token: route.params.token})
          }>
          <View style={styles.rowButton}>
            <Image
              style={styles.iconButton}
              source={require('../../../assets/Image_Icon/edit.png')}
            />
            <Text style={styles.txtButton}>Edit Users</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('AdminUserDelete', {token: route.params.token})
          }>
          <View style={styles.rowButton}>
            <Image
              style={styles.iconButton}
              source={require('../../../assets/Image_Icon/remove.png')}
            />
            <Text style={styles.txtButton}>Remove Users</Text>
          </View>
        </TouchableOpacity>
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
    marginLeft: '4%',
    marginTop: '0%',
    fontSize: rf(2.7),
    fontWeight: 'bold',
    color: '#4c4c4c',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },

  txtName: {
    padding: '1.5%',
    margin: '1%',
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  txtNormal: {
    padding: '1.5%',
    margin: '2%',
    fontSize: rf(2),
    fontWeight: 'bold',
    color: '#ffffff',
    alignSelf: 'center',
  },

  txtButton: {
    padding: '4%',
    margin: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#4c4c4c',
    alignSelf: 'center',
  },

  txtButtonSmall: {
    fontSize: rf(1.8),
    padding: '5%',
    fontWeight: 'normal',
    color: '#ffffff',
  },

  button: {
    margin: '2.5%',
    width: '80%',
    borderRadius: 24,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  row: {
    flexDirection: 'row',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  rowButton: {
    flexDirection: 'row',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    height: '30%',
    resizeMode: 'contain',
  },

  iconButton: {
    width: '20%',
    height: '75%',
    margin: '1.5%',
    resizeMode: 'contain',
  },
});

export default AdminUserManageScreen;
