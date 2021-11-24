import {StyleSheet} from 'react-native';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';

export const commonScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
  },

  container2: {
    flex: 0.93,
    backgroundColor: '#fff',
  },

  containerProfileScreen: {
    flex: 1,
    height: rf(105),
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  topHomeScreen: {
    backgroundColor: '#00BFFF',
    flex: 0.28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  midHomeScreen: {
    flex: 0.72,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topLocationScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flex: 0.1,
  },

  midLocationScreen: {
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

  txt: {
    margin: '1%',
    textAlign: 'center',
    justifyContent: 'center',
  },

  txtHeader: {
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

  txtNormal: {
    padding: '1.5%',
    margin: '2%',
    fontSize: rf(2),
    fontWeight: 'bold',
    color: '#ffffff',
    alignSelf: 'center',
  },

  txtButton: {
    fontSize: rf(2.5),
    padding: '2%',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  txtButtonSmall: {
    fontSize: rf(1.8),
    padding: '2.5%',
    fontWeight: 'normal',
    color: '#ffffff',
  },

  txtNameProfileScreen: {
    padding: '1.5%',
    fontWeight: 'bold',
    fontSize: rf(2.6),
    color: '#4c4c4c',
  },

  txtRoleProfileScreen: {
    padding: '1.5%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#4c4c4c',
  },

  buttonNoColor: {
    margin: '2.5%',
    width: '80%',
    borderRadius: 24,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  buttonColor: {
    backgroundColor: '#00BFFF',
    margin: '2.5%',
    borderRadius: 24,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonSmall: {
    margin: '1.5%',
    width: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#59ADFF',
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

  shadowGray: {
    shadowColor: '#a2a2a2',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  shadowBlue: {
    shadowColor: '#00BFFF',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  img: {
    width: '30%',
    height: '75%',
    resizeMode: 'contain',
  },

  image: {
    resizeMode: 'contain',
    margin: '1.5%',
    height: '35%',
    width: '35%',
  },
});
