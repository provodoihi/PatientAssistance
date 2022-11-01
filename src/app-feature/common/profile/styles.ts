import {StyleSheet} from 'react-native';
import {
  responsiveScreenFontSize as rf,
  responsiveScreenHeight as rh,
} from 'react-native-responsive-dimensions';
import {palette} from '../../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },

  scrollView: {
    flex: 0.93,
    backgroundColor: palette.white,
  },

  container2: {
    height: rh(110),
    // flexGrow: 1,
    backgroundColor: palette.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  image: {
    width: '35%',
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
    color: palette.black,
  },

  textBigBoldWhite: {
    fontSize: rf(2.5),
    padding: '2.5%',
    fontWeight: 'bold',
    color: palette.white,
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
});
