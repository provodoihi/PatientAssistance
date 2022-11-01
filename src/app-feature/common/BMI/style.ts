import {StyleSheet} from 'react-native';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import {palette} from '../../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },

  container2: {
    flex: 0.93,
    backgroundColor: palette.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '30%',
    margin: '1%',
    height: '25%',
    resizeMode: 'contain',
  },

  imageModal: {
    width: 128,
    height: 128,
    margin: '2%',
    resizeMode: 'contain',
  },

  modal: {
    backgroundColor: palette.white,
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
    color: palette.black,
  },

  textBigBoldWhite: {
    fontSize: rf(2.5),
    padding: '2.5%',
    fontWeight: 'bold',
    color: palette.white,
  },

  textNormalBoldBlack: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'bold',
    color: palette.black,
  },

  textNormalBlack: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: palette.black,
  },

  buttonBlue: {
    backgroundColor: palette.aquaBlue,
    margin: '3%',
    borderRadius: 24,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonModal: {
    backgroundColor: palette.white,
    margin: '3%',
    borderRadius: 24,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  shadowBlue: {
    shadowColor: palette.aquaBlue,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },

  shadowGray: {
    shadowColor: palette.lightGrey,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
