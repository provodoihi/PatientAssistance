import {StyleSheet} from 'react-native';
import {
  responsiveScreenFontSize as rf,
  responsiveScreenHeight as rh,
} from 'react-native-responsive-dimensions';
import {palette} from '../../../../utils';

export const styleAppointmentBookingScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },

  scrollView: {
    flex: 0.93,
    backgroundColor: palette.white,
  },

  container2: {
    flex: 1,
    backgroundColor: palette.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  modal: {
    backgroundColor: palette.white,
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
  },

  modalContainer: {
    flex: 0.2,
    width: '80%',
    borderRadius: 24,
    alignSelf: 'center',
  },

  datePicker: {
    margin: '3%',
    height: rh(20),
  },

  image: {
    width: '30%',
    margin: '1%',
    height: '20%',
    resizeMode: 'contain',
  },

  textAlignCenter: {
    margin: '1.5%',
    textAlign: 'center',
    alignSelf: 'center',
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
    color: palette.white,
  },

  textNormalBoldWhite: {
    fontSize: rf(2),
    padding: '2%',
    fontWeight: 'bold',
    color: palette.white,
  },

  textNormalBoldBlack: {
    fontSize: rf(2),
    padding: '2%',
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  textNormalBlack: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#4c4c4c',
  },

  textSmallNormalBlack: {
    padding: '1.5%',
    fontSize: rf(1.8),
    fontWeight: 'normal',
    color: '#4c4c4c',
  },

  buttonBlue: {
    backgroundColor: '#00BFFF',
    margin: '3%',
    borderRadius: 24,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonNoColor: {
    margin: '3%',
    width: '80%',
    borderRadius: 24,
    justifyContent: 'center',
    backgroundColor: palette.white,
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
