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

  modalBMIScreen: {
    backgroundColor: '#ffffff',
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainerBMIScreen: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  txt: {
    margin: '1.5%',
    textAlign: 'center',
    justifyContent: 'center',
  },

  txtWelcomeHomeScreen: {
    marginLeft: '4%',
    fontSize: rf(2.7),
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'left',
  },

  txtMidHomeScreen: {
    marginLeft: '4%',
    marginTop: '0%',
    fontSize: rf(2.7),
    fontWeight: 'bold',
    color: '#4c4c4c',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },

  txtBoldBigWhite: {
    fontSize: rf(2.4),
    padding: '2.5%',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  txtBoldWhite: {
    padding: '2%',
    fontSize: rf(2.2),
    fontWeight: 'bold',
    color: '#ffffff',
  },

  txtNormalWhite: {
    padding: '2.5%',
    fontSize: rf(2),
    fontWeight: 'bold',
    color: '#ffffff',
  },

  txtBoldBigBlack: {
    fontSize: rf(2.4),
    padding: '2.5%',
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  txtBoldBlack: {
    padding: '2%',
    fontSize: rf(2.2),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  txtNormalBlack: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#4c4c4c',
  },

  txtNormalSmallBlack: {
    fontSize: rf(1.8),
    padding: '1.5%',
    fontWeight: 'normal',
    color: '#4c4c4c',
  },

  txtNormalSmallWhite: {
    fontSize: rf(1.8),
    padding: '1.5%',
    fontWeight: 'normal',
    color: '#ffffff',
  },

  txtBoldSmallBlack: {
    fontSize: rf(1.8),
    padding: '1.5%',
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  txtBoldSmallWhite: {
    fontSize: rf(1.8),
    padding: '1.5%',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  txtNormalTinyBlack: {
    padding: '1.5%',
    fontSize: rf(1.5),
    fontWeight: 'normal',
    color: '#4c4c4c',
  },

  txtNormalTinyWhite: {
    padding: '1.5%',
    fontSize: rf(1.5),
    fontWeight: 'normal',
    color: '#ffffff',
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

  buttonModalBMIScreen: {
    backgroundColor: '#FFFFFF',
    margin: '3.5%',
    borderRadius: 24,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
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

  imageModalBMIScreen: {
    width: 128,
    height: 128,
    margin: '5%',
    resizeMode: 'contain',
  },
});
