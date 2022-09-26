import {StyleSheet} from 'react-native';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';

export const styleAppointmentListScreen = StyleSheet.create({
  container: {
    flex: 1,
  },

  container2: {
    flex: 0.93,
    backgroundColor: '#ffffff',
  },

  topScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.35,
    backgroundColor: '#ffffff',
  },

  midScreen: {
    flex: 0.65,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#ffffff',
  },

  modal: {
    backgroundColor: '#ffffff',
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },

  image: {
    width: '40%',
    margin: '1%',
    height: '35%',
    resizeMode: 'contain',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
  },

  textAlignCenter: {
    margin: '1.5%',
    textAlign: 'center',
    alignSelf: 'center',
  },

  textAlignLeft: {
    margin: '1.5%',
    marginLeft: '3.5%',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },

  textBigBoldBlack: {
    padding: '2.5%',
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  textBigBoldWhite: {
    fontSize: rf(2.5),
    padding: '2.5%',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  textNormalBoldWhite: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'bold',
    color: '#ffffff',
  },

  textNormalBoldBlack: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  textNormalBlack: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#4c4c4c',
  },

  textNormalGreen: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#66ff66',
  },

  textNormalRed: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#ff6666',
  },

  textNormalOrange: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#ffc966',
  },

  textSmallBoldBlack: {
    fontSize: rf(1.8),
    padding: '1.5%',
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  textSmallNormalBlack: {
    fontSize: rf(1.8),
    padding: '1.5%',
    fontWeight: 'normal',
    color: '#4c4c4c',
  },

  textSmallNormalGreen: {
    fontSize: rf(1.8),
    padding: '1.5%',
    fontWeight: 'normal',
    color: '#66ff66',
  },

  textSmallNormalOrange: {
    fontSize: rf(1.8),
    padding: '1.5%',
    fontWeight: 'normal',
    color: '#ffc966',
  },

  textSmallNormalRed: {
    fontSize: rf(1.8),
    padding: '1.5%',
    fontWeight: 'normal',
    color: '#ff6666',
  },

  buttonNoColor: {
    margin: '3%',
    marginBottom: '4.5%',
    width: '90%',
    borderRadius: 24,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },

  buttonBlue: {
    backgroundColor: '#00BFFF',
    margin: '3%',
    borderRadius: 24,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  shadowBlue: {
    shadowColor: '#00BFFF',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
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
});
